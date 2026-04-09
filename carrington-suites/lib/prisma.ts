import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 🔥 Force correct runtime DB (ignore bad env like file.db)
const rawUrl = process.env.DATABASE_URL;

const databaseUrl =
  rawUrl && rawUrl.startsWith("postgres")
    ? rawUrl
    : undefined;

// 🚨 Debug (you can remove later)
console.log("=== PRISMA INIT DEBUG ===");
console.log("RAW DATABASE_URL:", rawUrl);
console.log("FINAL DATABASE_URL:", databaseUrl);
console.log("=========================");

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is missing or invalid in Vercel");
}

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