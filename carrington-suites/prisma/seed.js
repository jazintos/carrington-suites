const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  // CLEAR EXISTING DATA
  await prisma.booking.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.apartmentType.deleteMany();

  // CREATE TYPES
  const executive = await prisma.apartmentType.create({
    data: { name: "Executive", price: 800000 },
  });

  const premium = await prisma.apartmentType.create({
    data: { name: "Premium", price: 600000 },
  });

  const signature = await prisma.apartmentType.create({
    data: { name: "Signature", price: 500000 },
  });

  // CREATE UNITS

  // Executive → 8 units
  for (let i = 1; i <= 8; i++) {
    await prisma.unit.create({
      data: {
        name: `Executive-${i}`,
        apartmentTypeId: executive.id,
      },
    });
  }

  // Premium → 1 unit
  await prisma.unit.create({
    data: {
      name: "Premium-1",
      apartmentTypeId: premium.id,
    },
  });

  // Signature → 3 units
  for (let i = 1; i <= 3; i++) {
    await prisma.unit.create({
      data: {
        name: `Signature-${i}`,
        apartmentTypeId: signature.id,
      },
    });
  }

  console.log("✅ Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());