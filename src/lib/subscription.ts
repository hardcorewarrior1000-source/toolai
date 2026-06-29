export interface Tier {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
  limits: Record<string, number | "unlimited">;
  adsEnabled: boolean;
}

export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    description: "Get started with basic access to all tools.",
    features: [
      "5,000 uses/day on AI tools",
      "Crypto API tools: 1,000/day",
      "Basic tools unlimited",
      "Ad-supported",
      "Community support",
    ],
    limits: {
      "ai-humanizer": 5000,
      "color-palette": 5000,
      "image-to-prompt": 5000,
      "qr-generator": 5000,
      "crypto-price-calculator": 1000,
      "eth-gas-estimator": 1000,
      "wallet-balance-checker": 1000,
      "password-generator": "unlimited",
      "json-formatter": "unlimited",
      "word-counter": "unlimited",
      "text-to-slug": "unlimited",
      "gradient-generator": "unlimited",
      "image-to-base64": "unlimited",
      "crypto-address-validator": "unlimited",
      "crypto-unit-converter": "unlimited",
      "mnemonic-generator": "unlimited",
      "crypto-payment-link": "unlimited",
    },
    adsEnabled: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: 5,
    priceLabel: "$5",
    description: "For regular users who want more usage and no ads.",
    features: [
      "20,000 uses/day on all tools",
      "Crypto API tools: 5,000/day",
      "No ads",
      "Email support",
      "All tools included",
    ],
    limits: {
      "ai-humanizer": 20000,
      "color-palette": 20000,
      "image-to-prompt": 20000,
      "qr-generator": 20000,
      "crypto-price-calculator": 5000,
      "eth-gas-estimator": 5000,
      "wallet-balance-checker": 5000,
      "password-generator": "unlimited",
      "json-formatter": "unlimited",
      "word-counter": "unlimited",
      "text-to-slug": "unlimited",
      "gradient-generator": "unlimited",
      "image-to-base64": "unlimited",
      "crypto-address-validator": "unlimited",
      "crypto-unit-converter": "unlimited",
      "mnemonic-generator": "unlimited",
      "crypto-payment-link": "unlimited",
    },
    adsEnabled: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 15,
    priceLabel: "$15",
    description: "For power users and freelancers who need unlimited access.",
    features: [
      "Unlimited usage",
      "No ads",
      "Priority support",
      "Early access to new tools",
    ],
    limits: {
      "ai-humanizer": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      "password-generator": "unlimited",
      "json-formatter": "unlimited",
      "word-counter": "unlimited",
      "text-to-slug": "unlimited",
      "gradient-generator": "unlimited",
      "image-to-base64": "unlimited",
      "crypto-address-validator": "unlimited",
      "crypto-unit-converter": "unlimited",
      "mnemonic-generator": "unlimited",
      "crypto-payment-link": "unlimited",
    },
    adsEnabled: false,
  },
  {
    id: "business",
    name: "Business",
    price: 45,
    priceLabel: "$45",
    description: "For developers and agencies who need API access and team features.",
    features: [
      "Everything in Pro",
      "API access",
      "White-label embed codes",
      "Up to 5 team seats",
      "Dedicated support",
    ],
    limits: {
      "ai-humanizer": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      "password-generator": "unlimited",
      "json-formatter": "unlimited",
      "word-counter": "unlimited",
      "text-to-slug": "unlimited",
      "gradient-generator": "unlimited",
      "image-to-base64": "unlimited",
      "crypto-address-validator": "unlimited",
      "crypto-unit-converter": "unlimited",
      "mnemonic-generator": "unlimited",
      "crypto-payment-link": "unlimited",
    },
    adsEnabled: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    priceLabel: "$99",
    description: "For companies that need custom branding and SLA guarantees.",
    features: [
      "Everything in Business",
      "Unlimited team seats",
      "Custom branding",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
    ],
    limits: {
      "ai-humanizer": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      "password-generator": "unlimited",
      "json-formatter": "unlimited",
      "word-counter": "unlimited",
      "text-to-slug": "unlimited",
      "gradient-generator": "unlimited",
      "image-to-base64": "unlimited",
      "crypto-address-validator": "unlimited",
      "crypto-unit-converter": "unlimited",
      "mnemonic-generator": "unlimited",
      "crypto-payment-link": "unlimited",
    },
    adsEnabled: false,
  },
];

export function getTier(id: string): Tier {
  return tiers.find((t) => t.id === id) || tiers[0];
}

export function getTierIndex(id: string): number {
  const idx = tiers.findIndex((t) => t.id === id);
  return idx >= 0 ? idx : 0;
}

const USAGE_KEY = "toolai_usage";
const TIER_KEY = "toolai_tier";

export function getCurrentTier(): Tier {
  if (typeof window === "undefined") return tiers[0];
  const tierId = localStorage.getItem(TIER_KEY) || "free";
  const tier = getTier(tierId);
  if (tier.id !== "free") {
    const licRaw = localStorage.getItem("toolai_license");
    if (licRaw) {
      try {
        const lic = JSON.parse(licRaw);
        if (new Date(lic.expiresAt) < new Date()) {
          localStorage.removeItem("toolai_license");
          localStorage.setItem(TIER_KEY, "free");
          return tiers[0];
        }
      } catch {}
    }
  }
  return tier;
}

export function setCurrentTier(tierId: string) {
  localStorage.setItem(TIER_KEY, tierId);
}

export function getUsage(toolId: string): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(USAGE_KEY);
  if (!raw) return 0;
  try {
    const data = JSON.parse(raw!);
    const today = new Date().toISOString().split("T")[0];
    if (data.date !== today) return 0;
    return data.tools?.[toolId] || 0;
  } catch {
    return 0;
  }
}

export function trackUsage(toolId: string): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(USAGE_KEY);
  let data = { date: new Date().toISOString().split("T")[0], tools: {} as Record<string, number> };
  try {
    const parsed = JSON.parse(raw!);
    if (parsed.date === data.date) data = parsed;
  } catch {}
  data.tools[toolId] = (data.tools[toolId] || 0) + 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(data));
  return data.tools[toolId];
}

export function getRemainingUses(toolId: string): number | "unlimited" {
  const tier = getCurrentTier();
  const limit = tier.limits[toolId] ?? 5;
  if (limit === "unlimited") return "unlimited";
  const used = getUsage(toolId);
  return Math.max(0, limit - used);
}

export function canUse(toolId: string): boolean {
  const remaining = getRemainingUses(toolId);
  return remaining === "unlimited" || remaining > 0;
}
