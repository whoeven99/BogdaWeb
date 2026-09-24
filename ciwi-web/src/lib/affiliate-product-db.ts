// Web 入口只走 HTTP。Node 入口会加载 libsql 原生包，Alpine standalone 里没有 @libsql/linux-x64-musl。
import {createClient, type Client} from "@libsql/client/web";

export type AffiliateProductDb = "translator" | "spark";

const clients = new Map<AffiliateProductDb, Client>();

function readCredentials(urlKey: string, tokenKey: string) {
  const url = process.env[urlKey]?.trim();
  const authToken = process.env[tokenKey]?.trim();

  if (!url?.startsWith("libsql://") || !authToken) {
    return null;
  }

  return {url, authToken};
}

export function getAffiliateProductDb(product: AffiliateProductDb): Client {
  const cached = clients.get(product);
  if (cached) {
    return cached;
  }

  const credentials =
    product === "translator"
      ? readCredentials("TURSO_TSF_DATABASE_URL", "TURSO_TSF_AUTH_TOKEN")
      : readCredentials("TURSO_SPARK_DATABASE_URL", "TURSO_SPARK_AUTH_TOKEN");

  if (!credentials) {
    throw new Error(product === "translator" ? "TURSO_TSF 未配置" : "TURSO_SPARK 未配置");
  }

  const client = createClient(credentials);
  clients.set(product, client);
  return client;
}
