import { describe, it, expect } from "vitest";

function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(input)).then((buf) => {
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

const SALT = "toolai_v1_2026";

async function generateLicenseKey(txHash: string, tier: string): Promise<string> {
  const hash = await sha256(txHash + tier + SALT);
  const segments = [
    hash.slice(0, 4).toUpperCase(),
    hash.slice(4, 8).toUpperCase(),
    hash.slice(8, 12).toUpperCase(),
    hash.slice(12, 16).toUpperCase(),
  ];
  return `TOOLAI-${segments.join("-")}`;
}

describe("License key generation", () => {
  it("generates key in correct format", async () => {
    const key = await generateLicenseKey("abc123", "pro");
    expect(key).toMatch(/^TOOLAI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });

  it("same inputs produce same key", async () => {
    const key1 = await generateLicenseKey("abc123", "pro");
    const key2 = await generateLicenseKey("abc123", "pro");
    expect(key1).toBe(key2);
  });

  it("different txHash produces different key", async () => {
    const key1 = await generateLicenseKey("abc123", "pro");
    const key2 = await generateLicenseKey("def456", "pro");
    expect(key1).not.toBe(key2);
  });

  it("different tier produces different key", async () => {
    const key1 = await generateLicenseKey("abc123", "pro");
    const key2 = await generateLicenseKey("abc123", "business");
    expect(key1).not.toBe(key2);
  });
});

describe("sha256", () => {
  it("returns 64 char hex string", async () => {
    const hash = await sha256("test");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is deterministic", async () => {
    const hash1 = await sha256("test");
    const hash2 = await sha256("test");
    expect(hash1).toBe(hash2);
  });
});
