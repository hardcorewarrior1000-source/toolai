import { describe, it, expect } from "vitest";
import { tiers, getTier, getTierIndex } from "../src/lib/subscription";

describe("tiers", () => {
  it("has 5 tiers", () => {
    expect(tiers).toHaveLength(5);
  });

  it("free tier is first", () => {
    expect(tiers[0].id).toBe("free");
    expect(tiers[0].price).toBe(0);
  });

  it("enterprise tier is last", () => {
    expect(tiers[4].id).toBe("enterprise");
    expect(tiers[4].price).toBe(99);
  });

  it("all tiers have required fields", () => {
    for (const tier of tiers) {
      expect(tier.id).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(typeof tier.price).toBe("number");
      expect(tier.priceLabel).toBeTruthy();
      expect(tier.description).toBeTruthy();
      expect(Array.isArray(tier.features)).toBe(true);
      expect(typeof tier.limits).toBe("object");
      expect(typeof tier.adsEnabled).toBe("boolean");
    }
  });

  it("all tiers include ai-chatbot in limits", () => {
    for (const tier of tiers) {
      expect(tier.limits).toHaveProperty("ai-chatbot");
    }
  });
});

describe("getTier", () => {
  it("returns free tier for unknown id", () => {
    expect(getTier("unknown").id).toBe("free");
  });

  it("returns correct tier for known id", () => {
    expect(getTier("pro").id).toBe("pro");
    expect(getTier("pro").price).toBe(15);
  });
});

describe("getTierIndex", () => {
  it("returns 0 for unknown id", () => {
    expect(getTierIndex("unknown")).toBe(0);
  });

  it("returns correct index", () => {
    expect(getTierIndex("free")).toBe(0);
    expect(getTierIndex("starter")).toBe(1);
    expect(getTierIndex("pro")).toBe(2);
    expect(getTierIndex("business")).toBe(3);
    expect(getTierIndex("enterprise")).toBe(4);
  });
});
