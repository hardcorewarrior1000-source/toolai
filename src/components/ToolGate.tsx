"use client";

import { type ReactNode } from "react";
import { useSubscription } from "@/components/SubscriptionProvider";
import UsageBadge from "@/components/UsageBadge";
import UpgradePrompt from "@/components/UpgradePrompt";

interface ToolGateProps {
  toolId: string;
  children: ReactNode;
  onUse?: () => void;
}

export default function ToolGate({ toolId, children, onUse }: ToolGateProps) {
  const { allowed } = useSubscription();
  const canProceed = allowed(toolId);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <UsageBadge toolId={toolId} />
      </div>
      {canProceed ? (
        children
      ) : (
        <UpgradePrompt toolId={toolId} />
      )}
    </div>
  );
}
