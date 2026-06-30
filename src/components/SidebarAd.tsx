"use client";

import Script from "next/script";
import { useSubscription } from "@/components/SubscriptionProvider";

export default function SidebarAd() {
  const { tier } = useSubscription();

  if (!tier.adsEnabled) return null;

  return (
    <div className="hidden lg:block sticky top-16 w-[300px] shrink-0">
      <div className="text-[10px] text-zinc-600 text-center mb-1">Advertisement</div>
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
        <Script
          async
          src="https://a.magsrv.com/ad-provider.js"
          strategy="afterInteractive"
        />
        <ins className="eas6a97888e2 block" data-zoneid="5962288" style={{ width: "300px", height: "250px" }} />
        <Script id="exoclick-sidebar" strategy="afterInteractive">
          {`(AdProvider = window.AdProvider || []).push({"serve": {}});`}
        </Script>
      </div>
    </div>
  );
}
