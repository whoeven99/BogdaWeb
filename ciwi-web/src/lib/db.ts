import {PrismaLibSQL} from "@prisma/adapter-libsql/web";

import {PrismaClient} from "@/generated/prisma";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function createPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url?.startsWith("libsql://")) {
    throw new Error('请设置有效的 TURSO_DATABASE_URL，例如 "libsql://xxx.turso.io"。');
  }

  if (!authToken) {
    throw new Error("请设置 TURSO_AUTH_TOKEN。");
  }

  const adapter = new PrismaLibSQL({url, authToken});
  return new PrismaClient({adapter});
}

export function getPrisma() {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = createPrismaClient();
  }

  return globalThis.prismaGlobal;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
