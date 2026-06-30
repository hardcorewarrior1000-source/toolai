"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { marked } from "marked";
import { useSubscription } from "@/components/SubscriptionProvider";

marked.setOptions({ breaks: true, gfm: true });

interface Message {
  role: "user" | "assistant";
  content: string;
}

type ProviderType = "groq" | "openrouter";

interface ModelConfig {
  id: string;
  name: string;
  tier: string;
  description: string;
  provider: ProviderType;
}

const MODELS: ModelConfig[] = [
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", tier: "free", description: "Meta's most capable free model — fast and smart", provider: "groq" },
  { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B", tier: "free", description: "Lightning-fast responses, great for quick tasks", provider: "groq" },
  { id: "gemma2-9b-it", name: "Gemma 2 9B", tier: "free", description: "Google's efficient model, good at reasoning", provider: "groq" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron 3 Super", tier: "pro", description: "NVIDIA's 120B parameter powerhouse", provider: "openrouter" },
  { id: "google/gemma-4-26b-a4b-it:free", name: "Gemma 4 26B", tier: "pro", description: "Google's latest, great for creative tasks", provider: "openrouter" },
  { id: "openai/gpt-oss-20b:free", name: "GPT-OSS 20B", tier: "pro", description: "OpenAI's open-source model", provider: "openrouter" },
  { id: "openai/gpt-oss-120b:free", name: "GPT-OSS 120B", tier: "enterprise", description: "Most powerful open-source model", provider: "openrouter" },
];

const FREE_DAILY_LIMIT = 50;
const USAGE_KEY = "zelve_ai_chat_usage";

function getTodayUsage(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    const today = new Date().toISOString().split("T")[0];
    if (data.date !== today) return 0;
    return data.count || 0;
  } catch {
    return 0;
  }
}

function incrementUsage(): number {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().split("T")[0];
  let count = 0;
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === today) count = data.count || 0;
    }
  } catch {}
  count++;
  localStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count }));
  return count;
}

export default function ZelveAIChatPage() {
  const { tier } = useSubscription();
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScroll = useRef(true);

  const tierLevel = tier.id === "enterprise" || tier.id === "business" ? 4 :
                    tier.id === "pro" ? 3 :
                    tier.id === "starter" ? 2 : 1;

  const canUseModel = useCallback((modelTier: string) => {
    if (tierLevel >= 4) return true;
    if (tierLevel >= 3 && (modelTier === "free" || modelTier === "pro")) return true;
    if (modelTier === "free") return true;
    return false;
  }, [tierLevel]);

  const availableModels = MODELS.filter((m) => canUseModel(m.tier));
  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];
  const remaining = tier.id === "free" ? Math.max(0, FREE_DAILY_LIMIT - usage) : -1;

  useEffect(() => {
    setUsage(getTodayUsage());
    if (availableModels.length > 0 && !availableModels.find((m) => m.id === selectedModel)) {
      setSelectedModel(availableModels[0].id);
    }
  }, [tier]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    isAutoScroll.current = atBottom;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    if (isAutoScroll.current && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (tier.id === "free" && getTodayUsage() >= FREE_DAILY_LIMIT) {
      setError("Daily free limit reached. Upgrade to Starter for 500 messages/day.");
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setError("");
    isAutoScroll.current = true;

    const newMessages = [...messages, { role: "user" as const, content: userMsg }, { role: "assistant" as const, content: "" }];
    setMessages(newMessages);
    setLoading(true);

    if (tier.id === "free") {
      const newUsage = incrementUsage();
      setUsage(newUsage);
    }

    try {
      const modelConfig = MODELS.find((m) => m.id === selectedModel);
      const isGroq = modelConfig?.provider === "groq";

      const endpoint = isGroq
        ? "https://api.groq.com/openai/v1/chat/completions"
        : "https://openrouter.ai/api/v1/chat/completions";

      const apiKey = isGroq
        ? process.env.NEXT_PUBLIC_DEFAULT_GROQ_KEY
        : process.env.NEXT_PUBLIC_DEFAULT_OPENROUTER_KEY;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      if (!isGroq) {
        headers["HTTP-Referer"] = "https://toolai.zelve.xyz";
        headers["X-Title"] = "Zelve Tool AI";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: selectedModel,
          messages: newMessages.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let full = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              full += delta;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Request failed";
      setError(msg);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => { setMessages([]); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Zelve <span className="text-emerald-400">AI Chat</span>
        </h1>
        <p className="text-zinc-400">
          Chat with powerful AI models. {tier.id === "free" ? "Free tier includes 50 messages/day." : tier.id === "starter" ? "Starter plan: 500 messages/day." : "Unlimited messages with your plan."}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-zinc-300">Model:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
            >
              {availableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.provider === "groq" ? "(Fast)" : ""}
                </option>
              ))}
            </select>
            {availableModels.length < MODELS.length && (
              <button
                onClick={() => window.location.href = "/pricing"}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Upgrade for more models →
              </button>
            )}
          </div>

          {tier.id === "free" ? (
            <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              remaining > 20 ? "bg-emerald-500/10 text-emerald-400" : remaining > 0 ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
            }`}>
              {remaining > 0 ? `${remaining}/${FREE_DAILY_LIMIT} messages today` : "Limit reached"}
            </div>
          ) : tier.id === "starter" ? (
            <div className="text-xs px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400">
              500 messages/day
            </div>
          ) : (
            <div className="text-xs px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400">
              Unlimited
            </div>
          )}
        </div>
        <p className="text-[10px] text-zinc-600 mt-2">{currentModel.description}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div ref={scrollRef} className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600">
              <span className="text-4xl mb-3">{"\uD83D\uDCAC"}</span>
              <p className="text-sm">Start a conversation by typing a message below</p>
              <p className="text-xs mt-1 text-zinc-700">Powered by open-source models via Zelve AI</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-emerald-600/20 text-emerald-100 border border-emerald-500/20"
                  : "bg-zinc-800 text-zinc-200 border border-zinc-700"
              }`}>
                {msg.role === "assistant" && i > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-[10px] text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {currentModel.name}
                  </div>
                )}
                {msg.role === "assistant" && msg.content ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none prose-headings:text-zinc-200 prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-zinc-200 prose-code:text-emerald-400 prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-700"
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                  />
                ) : (
                  <div className="whitespace-pre-wrap">
                    {msg.content || (loading && i === messages.length - 1 ? <span className="animate-pulse">{"\u25CF"}</span> : "")}
                  </div>
                )}
                {msg.role === "assistant" && msg.content && (
                  <button
                    onClick={() => navigator.clipboard.writeText(msg.content)}
                    className="mt-2 text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mx-4 mb-2 bg-red-950/30 border border-red-800/50 rounded-lg px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={send} className="border-t border-zinc-800 p-4">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); } }}
              placeholder={tier.id === "free" && remaining <= 0 ? "Upgrade to continue chatting..." : "Type your message..."}
              disabled={loading || (tier.id === "free" && remaining <= 0)}
              rows={1}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || (tier.id === "free" && remaining <= 0)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {loading ? "\u25CF\u25CF\u25CF" : "Send"}
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg text-sm transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[10px] text-zinc-600 mt-2">Enter to send · Shift+Enter for new line</p>
        </form>
      </div>

      <InContentAd />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="text-emerald-400 text-lg font-bold mb-1">Free</div>
          <p className="text-zinc-500 text-xs mb-3">50 messages/day</p>
          <p className="text-zinc-300 text-sm">Llama 3.3 70B, Llama 3.1 8B, Gemma 2 9B</p>
          <p className="text-zinc-600 text-xs mt-1">Powered by Groq — ultra-fast inference</p>
        </div>
        <div className="bg-zinc-900 border border-emerald-500/30 rounded-xl p-5 relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</div>
          <div className="text-emerald-400 text-lg font-bold mb-1">Pro</div>
          <p className="text-zinc-500 text-xs mb-3">$15/month</p>
          <p className="text-zinc-300 text-sm">6 models — Groq + OpenRouter</p>
          <p className="text-zinc-600 text-xs mt-1">5,000 messages/day</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="text-emerald-400 text-lg font-bold mb-1">Enterprise</div>
          <p className="text-zinc-500 text-xs mb-3">$99/month</p>
          <p className="text-zinc-300 text-sm">All 7 models + priority</p>
          <p className="text-zinc-600 text-xs mt-1">Unlimited messages</p>
        </div>
      </div>

      <AdBanner />
    </div>
  );
}
