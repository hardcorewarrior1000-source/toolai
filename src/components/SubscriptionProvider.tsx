"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  getCurrentTier,
  setCurrentTier,
  getUsage,
  trackUsage,
  getRemainingUses,
  canUse,
  type Tier,
} from "@/lib/subscription";

interface SubscriptionContextType {
  tier: Tier;
  setTier: (id: string) => void;
  usage: (toolId: string) => number;
  track: (toolId: string) => number;
  remaining: (toolId: string) => number | "unlimited";
  allowed: (toolId: string) => boolean;
  refresh: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  tier: { id: "free", name: "Free", price: 0, priceLabel: "$0", description: "", features: [], limits: {}, adsEnabled: true },
  setTier: () => {},
  usage: () => 0,
  track: () => 0,
  remaining: () => 5,
  allowed: () => true,
  refresh: () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<Tier>(tiers_free);
  const [, setTick] = useState(0);

  useEffect(() => {
    setTierState(getCurrentTier());
  }, []);

  const setTier = useCallback((id: string) => {
    setCurrentTier(id);
    setTierState(getCurrentTier());
    setTick((t) => t + 1);
  }, []);

  const usage = useCallback((toolId: string) => getUsage(toolId), [tier]);
  const track = useCallback((toolId: string) => {
    const n = trackUsage(toolId);
    setTick((t) => t + 1);
    return n;
  }, []);
  const remaining = useCallback((toolId: string) => getRemainingUses(toolId), [tier]);
  const allowed = useCallback((toolId: string) => canUse(toolId), [tier]);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, usage, track, remaining, allowed, refresh }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}

const tiers_free: Tier = { id: "free", name: "Free", price: 0, priceLabel: "$0", description: "", features: [], limits: {}, adsEnabled: true };
