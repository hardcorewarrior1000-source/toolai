"use client";

import Script from "next/script";
import { useSubscription } from "@/components/SubscriptionProvider";

export default function InContentAd() {
  const { tier } = useSubscription();

  if (!tier.adsEnabled) return null;

  return (
    <div className="my-8">
      <div className="text-[10px] text-zinc-600 text-center mb-1">Advertisement</div>
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50 flex justify-center">
        <Script
          async
          src="https://a.magsrv.com/ad-provider.js"
          strategy="afterInteractive"
        />
        <ins className="eas6a97888e2 block" data-zoneid="5962290" />
        <Script id="exoclick-incontent" strategy="afterInteractive">
          {`(AdProvider = window.AdProvider || []).push({"serve": {}});`}
        </Script>
      </div>
    </div>
  );
}
