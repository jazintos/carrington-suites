import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawUrl = process.env.DATABASE_URL;

// ✅ DO NOT crash during build
const databaseUrl =
  rawUrl && rawUrl.startsWith("postgres")
    ? rawUrl
    : undefined;

console.log("=== PRISMA INIT DEBUG ===");
console.log("RAW DATABASE_URL:", rawUrl);
console.log("USING DATABASE_URL:", databaseUrl);
console.log("=========================");

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: databaseUrl
      ? {
          db: { url: databaseUrl },
        }
      : undefined, // 👈 allow build to pass
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;