//Ez tölti be a .env-et és exportál egy env objektumot
import "dotenv/config";

function requireNumber(name: string, fallback?: number): number {
  const raw = process.env[name];

  if (raw == null || raw.trim() === "") {
    if (fallback != null) return fallback;
    throw new Error(`Missing required env var: ${name}`);
  }

  const n = Number(raw);
  if (!Number.isFinite(n)) {
    throw new Error(`Env var ${name} must be a number, got: "${raw}"`);
  }
  return n;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: requireNumber("PORT", 3001),
} as const;
