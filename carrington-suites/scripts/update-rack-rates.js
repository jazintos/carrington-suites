/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node script. */
// Read-only by default. Apply with: node scripts/update-rack-rates.js --apply
// Requires DATABASE_URL for the intended database. Never invokes the seed.
const { PrismaClient } = require('@prisma/client');
const { createHash } = require('node:crypto');
const rates = require('../lib/rack-rates.json');
const fingerprint = rows => createHash('sha256').update(JSON.stringify(rows)).digest('hex');

async function updateRackRates(prisma, apply = false) {
  return prisma.$transaction(async tx => {
    const names = Object.values(rates).map(rate => rate.name);
    const before = await tx.apartmentType.findMany({
      where: { name: { in: names } },
      select: { id: true, name: true, price: true },
      orderBy: { id: 'asc' },
    });
    if (before.length !== names.length || names.some(name => !before.some(row => row.name === name))) {
      throw new Error('Expected exactly the three named residence records; no rates changed');
    }
    if (!apply) return { applied: false, before };
    // Snapshot financial records without guest details; never update bookings.
    const bookingQuery = { orderBy: { id: 'asc' }, select: {
      id: true, totalPrice: true, status: true, paymentStatus: true,
      paymentRef: true, paymentData: true, paidAt: true, updatedAt: true,
    } };
    const bookingsBefore = await tx.booking.findMany(bookingQuery);
    for (const rate of Object.values(rates)) {
      await tx.apartmentType.update({ where: { name: rate.name }, data: { price: rate.price } });
    }
    const after = await tx.apartmentType.findMany({
      where: { name: { in: names } }, select: { id: true, name: true, price: true }, orderBy: { id: 'asc' },
    });
    if (Object.values(rates).some(rate => !after.some(row => row.name === rate.name && row.price === rate.price))) {
      throw new Error('Rate verification failed; rolling back');
    }
    if (fingerprint(bookingsBefore) !== fingerprint(await tx.booking.findMany(bookingQuery))) {
      throw new Error('Booking preservation check failed; rolling back');
    }
    return { applied: true, before, after, bookingsUnchanged: bookingsBefore.length };
  }, { isolationLevel: 'Serializable', timeout: 30000 });
}

if (require.main === module) {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not configured; database was not accessed.');
    process.exitCode = 1;
  } else {
    const prisma = new PrismaClient();
    updateRackRates(prisma, process.argv.includes('--apply'))
      .then(result => console.log(JSON.stringify(result, null, 2)))
      .catch(() => { console.error('Rate update failed; transaction rolled back. Check database access and residence names.'); process.exitCode = 1; })
      .finally(() => prisma.$disconnect());
  }
}
module.exports = { updateRackRates };
