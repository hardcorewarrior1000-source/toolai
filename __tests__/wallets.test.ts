import { describe, it, expect } from "vitest";
import { WALLETS, TIER_USD, type Chain } from "../src/lib/wallets";

describe("WALLETS", () => {
  it("has all three chains", () => {
    expect(WALLETS).toHaveProperty("solana");
    expect(WALLETS).toHaveProperty("ethereum");
    expect(WALLETS).toHaveProperty("bitcoin");
  });

  it("has valid addresses", () => {
    expect(WALLETS.solana.address).toMatch(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/);
    expect(WALLETS.ethereum.address).toMatch(/^0x[0-9a-fA-F]{40}$/);
    expect(WALLETS.bitcoin.address).toMatch(/^bc1[a-zA-HJ-NP-Za-km-z0-9]{25,39}$/);
  });

  it("has labels and icons", () => {
    for (const chain of ["solana", "ethereum", "bitcoin"] as Chain[]) {
      expect(WALLETS[chain].label).toBeTruthy();
      expect(WALLETS[chain].icon).toBeTruthy();
    }
  });
});

describe("TIER_USD", () => {
  it("has correct prices", () => {
    expect(TIER_USD.starter).toBe(5);
    expect(TIER_USD.pro).toBe(15);
    expect(TIER_USD.business).toBe(45);
    expect(TIER_USD.enterprise).toBe(99);
  });

  it("has all tiers", () => {
    expect(Object.keys(TIER_USD)).toEqual(["starter", "pro", "business", "enterprise"]);
  });
});
