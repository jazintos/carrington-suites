/* eslint-disable @typescript-eslint/no-require-imports -- Existing CommonJS seed; do not run against production. */
const { PrismaClient } = require("@prisma/client");

const rackRates = require("../lib/rack-rates.json");

const prisma = new PrismaClient();

async function main() {

  // CLEAR EXISTING DATA
  await prisma.booking.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.apartmentType.deleteMany();

  // CREATE TYPES (UPDATED NAMES + PRICES)
  const threeBedroom = await prisma.apartmentType.create({
    data: { name: "Three-Bedroom Premium Residence", price: rackRates["three-bedroom"].price },
  });

  const twoBedroom = await prisma.apartmentType.create({
    data: { name: "Two-Bedroom Signature Penthouse", price: rackRates["two-bedroom"].price },
  });

  const oneBedroom = await prisma.apartmentType.create({
    data: { name: "One-Bedroom Penthouse Residence", price: rackRates["one-bedroom"].price },
  });

// CREATE UNITS

// Three-Bedroom → 8 units
for (let i = 1; i <= 8; i++) {
  await prisma.unit.create({
    data: {
      name: `ThreeBedroom-${i}`,
      apartmentTypeId: threeBedroom.id,
    },
  });
}

// Two-Bedroom → 1 unit ONLY
await prisma.unit.create({
  data: {
    name: "TwoBedroom-1",
    apartmentTypeId: twoBedroom.id,
  },
});

// One-Bedroom → 3 units
for (let i = 1; i <= 3; i++) {
  await prisma.unit.create({
    data: {
      name: `OneBedroom-${i}`,
      apartmentTypeId: oneBedroom.id,
    },
  });
}

  console.log("✅ Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());