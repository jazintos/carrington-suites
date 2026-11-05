/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node script. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const rates = require('../lib/rack-rates.json');
const { updateRackRates } = require('./update-rack-rates');

// Execute actual route code with isolated database and HTTP dependencies.
function route(file, prisma, fetch = () => { throw new Error('Unexpected network call'); }) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    exports, console, process: { env: {} }, fetch,
    require(name) {
      if (name === '@/lib/prisma') return { default: prisma, __esModule: true };
      if (name === '@/lib/rack-rates.json') return rates;
      if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
      throw new Error(`Unexpected import ${name}`);
    },
  });
  return exports;
}

for (const [slug, rate] of Object.entries(rates)) {
  for (const nights of [1, 4]) {
    test(`${slug}: ${nights} nights uses rack rate despite stale DB and client amounts`, async () => {
      let created;
      const prisma = {
        apartmentType: { findUnique: async () => ({ name: rate.name, price: 1, units: [{ id: 1, name: 'Isolated unit' }] }) },
        booking: {
          findFirst: async () => null,
          create: async ({ data }) => { created = data; return { reference: 'isolated' }; },
        },
        blockedDate: { findFirst: async () => null },
      };
      const handler = route('app/api/bookings/create/route.ts', prisma);
      const response = await handler.POST({ json: async () => ({
        name: 'Isolated test', email: 'test@example.invalid', phone: '0', apartment: slug,
        checkin: '2099-01-01', checkout: `2099-01-0${1 + nights}`, totalPrice: 1, price: 1,
      }) });
      assert.equal(response.status, 200);
      assert.equal(created.nights, nights);
      assert.equal(created.totalPrice, rate.price * nights);
      assert.equal(response.body.totalPrice, rate.price * nights);
    });
  }
}

for (const total of [300000, 400000, 1600000, 500000, 2000000, 650000, 2600000]) {
test(`checkout charges stored total ${total} in kobo without rewriting it`, async () => {
  const booking = { reference: 'isolated', email: 'test@example.invalid', totalPrice: total, status: 'PENDING' };
  const before = JSON.stringify(booking);
  let amount;
  const handler = route('app/api/payments/initialize/route.ts', {
    booking: { findUnique: async () => booking },
  }, async (_url, options) => {
    amount = JSON.parse(options.body).amount;
    return { json: async () => ({ status: true, data: { authorization_url: 'https://example.invalid' } }) };
  });
  assert.equal((await handler.POST({ json: async () => ({ reference: booking.reference, amount: 1 }) })).status, 200);
  assert.equal(amount, total * 100);
  assert.equal(JSON.stringify(booking), before);
});

}

test('admin new-booking selector returns current rack rates', async () => {
  const handler = route('app/api/admin/apartment-types/route.ts', {
    apartmentType: { findMany: async () => Object.values(rates).map((rate, id) => ({ id, name: rate.name, price: 1 })) },
  });
  const response = await handler.GET();
  assert.deepEqual(Array.from(response.body, row => row.price), [400000, 500000, 650000]);
});

function database(missing = false) {
  let apartments = Object.values(rates).map((rate, id) => ({ id, name: rate.name, price: 1 }));
  if (missing) apartments.pop();
  const bookings = [{ id: 1, totalPrice: 350000, status: 'PENDING', paymentData: 'historical' }];
  let writes = 0;
  const tx = {
    apartmentType: {
      findMany: async () => structuredClone(apartments),
      update: async ({ where, data }) => { writes++; Object.assign(apartments.find(row => row.name === where.name), data); },
    },
    booking: { findMany: async () => structuredClone(bookings) },
  };
  return { $transaction: async fn => fn(tx), get writes() { return writes; }, bookings };
}

test('rate update is read-only by default, repeatable on apply, and preserves pending totals', async () => {
  const db = database();
  await updateRackRates(db);
  assert.equal(db.writes, 0);
  const first = await updateRackRates(db, true);
  const second = await updateRackRates(db, true);
  assert.deepEqual(first.after, second.after);
  assert.equal(second.bookingsUnchanged, 1);
  assert.equal(db.bookings[0].totalPrice, 350000);
});

test('missing residence aborts before any writes', async () => {
  const db = database(true);
  await assert.rejects(updateRackRates(db, true), /exactly the three/);
  assert.equal(db.writes, 0);
});
