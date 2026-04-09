import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 🔥 Force runtime env usage (critical fix)
const databaseUrl = process.env.DATABASE_URL;

// Optional but VERY useful for debugging (remove later)
console.log("=== PRISMA INIT DEBUG ===");
console.log("DATABASE_URL:", databaseUrl);
console.log("Starts with postgres:", databaseUrl?.startsWith("postgres"));
console.log("=========================");

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;