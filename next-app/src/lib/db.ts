import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// グローバル変数として定義（開発環境でのホットリロード対策）
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. PostgreSQLの接続プールを作成
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Prisma用のDriver Adapterを作成
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
