"use client";

import Script from "next/script";
import { useSubscription } from "@/components/SubscriptionProvider";

export default function AdBanner() {
  const { tier } = useSubscription();

  if (!tier.adsEnabled) return null;

  return (
    <div className="w-full my-8">
      <Script
        async
        src="https://a.magsrv.com/ad-provider.js"
        strategy="afterInteractive"
      />
      <ins className="eas6a97888e2 block" data-zoneid="5961814" />
      <Script id="exoclick-init" strategy="afterInteractive">
        {`(AdProvider = window.AdProvider || []).push({"serve": {}});`}
      </Script>
    </div>
  );
}
