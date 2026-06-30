import { describe, it, expect } from "vitest";

async function hashPw(pw: string, salt?: string): Promise<string> {
  const enc = new TextEncoder();
  if (!salt) {
    const s = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(s).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    key,
    256
  );
  return salt + ":" + Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPw(pw: string, stored: string): Promise<boolean> {
  return (await hashPw(pw, stored.split(":")[0])) === stored;
}

function genToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

describe("Password hashing", () => {
  it("hash includes salt and hash separated by colon", async () => {
    const hash = await hashPw("password123");
    expect(hash).toContain(":");
    const [salt, hashVal] = hash.split(":");
    expect(salt).toHaveLength(32);
    expect(hashVal).toHaveLength(64);
  });

  it("same password with same salt produces same hash", async () => {
    const hash1 = await hashPw("password123", "abc123");
    const hash2 = await hashPw("password123", "abc123");
    expect(hash1).toBe(hash2);
  });

  it("different passwords produce different hashes", async () => {
    const hash1 = await hashPw("password123");
    const hash2 = await hashPw("password456");
    expect(hash1).not.toBe(hash2);
  });
});

describe("Password verification", () => {
  it("verifies correct password", async () => {
    const hash = await hashPw("mypassword");
    expect(await verifyPw("mypassword", hash)).toBe(true);
  });

  it("rejects wrong password", async () => {
    const hash = await hashPw("mypassword");
    expect(await verifyPw("wrongpassword", hash)).toBe(false);
  });
});

describe("Token generation", () => {
  it("generates 64 char hex string", () => {
    const token = genToken();
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generates unique tokens", () => {
    const tokens = new Set(Array.from({ length: 100 }, () => genToken()));
    expect(tokens.size).toBe(100);
  });
});
