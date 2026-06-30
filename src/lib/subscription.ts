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

const ALL_UNLIMITED: Record<string, "unlimited"> = {
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
};

export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    description: "Get started with basic access to all tools.",
    features: [
      "2,500 uses/day on all tools",
      "Basic tools unlimited",
      "Ad-supported",
      "Community support",
    ],
    limits: {
      "ai-humanizer": 2500,
      "ai-chatbot": 2500,
      "color-palette": 2500,
      "image-to-prompt": 2500,
      "qr-generator": 2500,
      "crypto-price-calculator": 2500,
      "eth-gas-estimator": 2500,
      "wallet-balance-checker": 2500,
      ...ALL_UNLIMITED,
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
      "100,000 uses/day on all tools",
      "No ads",
      "Email support",
      "All tools included",
    ],
    limits: {
      "ai-humanizer": 100000,
      "ai-chatbot": 100000,
      "color-palette": 100000,
      "image-to-prompt": 100000,
      "qr-generator": 100000,
      "crypto-price-calculator": 100000,
      "eth-gas-estimator": 100000,
      "wallet-balance-checker": 100000,
      ...ALL_UNLIMITED,
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
      "ai-chatbot": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      ...ALL_UNLIMITED,
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
      "ai-chatbot": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      ...ALL_UNLIMITED,
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
      "ai-chatbot": "unlimited",
      "color-palette": "unlimited",
      "image-to-prompt": "unlimited",
      "qr-generator": "unlimited",
      "crypto-price-calculator": "unlimited",
      "eth-gas-estimator": "unlimited",
      "wallet-balance-checker": "unlimited",
      ...ALL_UNLIMITED,
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

const USAGE_KEY = "Zelve Tool AI_usage";
const TIER_KEY = "Zelve Tool AI_tier";

export function getCurrentTier(): Tier {
  if (typeof window === "undefined") return tiers[0];
  const tierId = localStorage.getItem(TIER_KEY) || "free";
  const tier = getTier(tierId);
  if (tier.id !== "free") {
    const licRaw = localStorage.getItem("Zelve Tool AI_license");
    if (licRaw) {
      try {
        const lic = JSON.parse(licRaw);
        if (new Date(lic.expiresAt) < new Date()) {
          localStorage.removeItem("Zelve Tool AI_license");
          localStorage.setItem(TIER_KEY, "free");
          return tiers[0];
        }
      } catch {
        localStorage.removeItem("Zelve Tool AI_license");
        localStorage.setItem(TIER_KEY, "free");
        return tiers[0];
      }
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
    const data = JSON.parse(raw);
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
    const parsed = JSON.parse(raw || "{}");
    if (parsed.date === data.date) data = parsed;
  } catch {
    // ignore malformed data
  }
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
