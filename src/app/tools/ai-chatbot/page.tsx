"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";

type Provider = "openrouter" | "openai" | "gemini" | "custom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProviderConfig {
  name: string;
  models: { id: string; name: string }[];
  placeholder: string;
  keyPrefix: string;
  baseUrl?: string;
  defaultKey?: string;
}

const DEFAULT_OPENROUTER_KEY = process.env.NEXT_PUBLIC_DEFAULT_OPENROUTER_KEY || "";

const PROVIDERS: Record<Provider, ProviderConfig> = {
  openrouter: {
    name: "OpenRouter",
    models: [
      { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron 3 Super (Free)" },
      { id: "google/gemma-4-26b-a4b-it:free", name: "Gemma 4 26B (Free)" },
      { id: "openai/gpt-oss-120b:free", name: "GPT-OSS 120B (Free)" },
      { id: "openai/gpt-oss-20b:free", name: "GPT-OSS 20B (Free)" },
    ],
    placeholder: "sk-or-...",
    keyPrefix: "sk-or-",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultKey: DEFAULT_OPENROUTER_KEY,
  },
  openai: {
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    ],
    placeholder: "sk-...",
    keyPrefix: "sk-",
  },
  gemini: {
    name: "Google Gemini",
    models: [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    ],
    placeholder: "AIza...",
    keyPrefix: "AIza",
  },
  custom: {
    name: "Custom (OpenAI-compatible)",
    models: [
      { id: "custom-model", name: "Enter model ID below" },
    ],
    placeholder: "sk-...",
    keyPrefix: "sk-",
    baseUrl: "",
  },
};

export default function AIChatbotPage() {
  const [provider, setProvider] = useState<Provider>("openrouter");
  const [apiKey, setApiKey] = useState(DEFAULT_OPENROUTER_KEY);
  const [model, setModel] = useState("nvidia/nemotron-3-super-120b-a12b:free");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyVisible, setKeyVisible] = useState(false);
  const [customModel, setCustomModel] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isAutoScroll = useRef(true);

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

  useEffect(() => {
    setModel(PROVIDERS[provider].models[0].id);
    setBaseUrl(PROVIDERS[provider].baseUrl || "");
    setCustomModel("");
    setError("");
    if (PROVIDERS[provider].defaultKey) {
      setApiKey(PROVIDERS[provider].defaultKey);
    } else {
      setApiKey("");
    }
  }, [provider]);

  const getKeyPreview = () => {
    if (!apiKey) return "";
    if (apiKey.length <= 8) return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
    return apiKey.slice(0, 4) + "\u2022\u2022\u2022\u2022" + apiKey.slice(-4);
  };

  async function streamOpenAI(msgs: Message[], mdl: string, key: string, url?: string): Promise<string> {
    const endpoint = (url || "https://api.openai.com") + "/chat/completions";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        ...(url?.includes("openrouter.ai") ? { "HTTP-Referer": "https://toolai.zelve.xyz", "X-Title": "Zelve Tool AI" } : {}),
      },
      body: JSON.stringify({
        model: mdl,
        messages: msgs.map((m) => ({ role: m.role, content: m.content })),
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
        } catch {
          // skip malformed SSE lines
        }
      }
    }
    return full;
  }

  async function streamGemini(msgs: Message[], mdl: string, key: string): Promise<string> {
    const contents = msgs.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${mdl}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key,
        },
        body: JSON.stringify({ contents }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini API error ${res.status}`);
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
        try {
          const json = JSON.parse(trimmed.slice(6));
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            full += text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: full };
              return updated;
            });
          }
        } catch {
          // skip malformed SSE lines
        }
      }
    }
    return full;
  }

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setError("");
    isAutoScroll.current = true;

    const newMessages = [...messages, { role: "user" as const, content: userMsg }, { role: "assistant" as const, content: "" }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const effectiveModel = provider === "custom" ? customModel.trim() : model;
      if (!effectiveModel) throw new Error("Please enter a model ID");

      if (provider === "gemini") {
        await streamGemini(newMessages.slice(0, -1), effectiveModel, apiKey.trim());
      } else {
        const url = provider === "openrouter" ? "https://openrouter.ai/api/v1" : provider === "custom" ? baseUrl.trim() : undefined;
        await streamOpenAI(newMessages.slice(0, -1), effectiveModel, apiKey.trim(), url);
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

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const config = PROVIDERS[provider];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">AI Chatbot Playground</h1>
      <p className="text-zinc-400 mb-8">
        Chat with AI directly in your browser. OpenRouter free models are pre-configured — no API key needed to start.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Provider</label>
            <div className="flex gap-2 flex-wrap">
              {(["openrouter", "openai", "gemini", "custom"] as Provider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    provider === p ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {PROVIDERS[p].name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Model</label>
            {provider === "custom" ? (
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="e.g. gpt-4o, claude-3-opus, ..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            ) : (
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {config.models.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              API Key
              {provider === "openrouter" && <span className="text-emerald-400 ml-1">(pre-configured)</span>}
            </label>
            {provider === "openrouter" ? (
              <div className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-500 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Free access pre-configured — no key needed
              </div>
            ) : (
              <div className="relative">
                <input
                  type={keyVisible ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={config.placeholder}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 pr-16 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  onClick={() => setKeyVisible(!keyVisible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5"
                >
                  {keyVisible ? "Hide" : "Show"}
                </button>
              </div>
            )}
          </div>
        </div>

        {provider === "custom" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com/v1"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            <p className="text-[10px] text-zinc-600 mt-1">OpenAI-compatible endpoint. Appends /chat/completions automatically.</p>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {provider === "openrouter" ? "Free models — no billing required" : "Keys stored in browser only"}
          </span>
          <span>|</span>
          <span>No data sent to Zelve Tool AI servers</span>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div ref={scrollRef} className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600">
              <span className="text-4xl mb-3">{"\uD83D\uDCAC"}</span>
              <p className="text-sm">Start a conversation by typing a message below</p>
              {provider === "openrouter" && (
                <p className="text-xs mt-1 text-emerald-500/60">Free models are pre-selected — just type and send</p>
              )}
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
                    {config.name} · {config.models.find((m) => m.id === model)?.name || model}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content || (loading && i === messages.length - 1 ? <span className="animate-pulse">{"\u25CF"}</span> : "")}</div>
                {msg.role === "assistant" && msg.content && (
                  <button
                    onClick={() => copyMessage(msg.content)}
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
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); } }}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
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
          <p className="text-[10px] text-zinc-600 mt-2">Enter to send, Shift+Enter for new line</p>
        </form>
      </div>

      <InContentAd />

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Supported Providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-emerald-400 font-medium mb-1">OpenRouter (Recommended)</p>
            <p className="text-zinc-400">5+ free models (Llama, Hermes, Qwen, Gemma) + paid (GPT-4o, Claude)</p>
            <p className="text-zinc-500 text-xs mt-1">Pre-configured with free access — start chatting immediately</p>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">OpenAI</p>
            <p className="text-zinc-400">GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo</p>
            <p className="text-zinc-500 text-xs mt-1">Requires OpenAI API key (platform.openai.com)</p>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">Google Gemini</p>
            <p className="text-zinc-400">Gemini 2.5 Flash/Pro, 2.0 Flash, 1.5 Flash</p>
            <p className="text-zinc-500 text-xs mt-1">Requires Google AI Studio API key (aistudio.google.com)</p>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">Custom (OpenAI-compatible)</p>
            <p className="text-zinc-400">Any OpenAI-compatible API (Ollama, LM Studio, vLLM, etc.)</p>
            <p className="text-zinc-500 text-xs mt-1">Enter your base URL and model ID manually</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-500">
          <p className="font-medium text-zinc-400 mb-1">{"\uD83D\uDD12"} Privacy Notice</p>
          <p>Your API key is stored only in your browser&apos;s memory and is sent directly to the AI provider. Zelve Tool AI never sees, stores, or transmits your key. The pre-filled OpenRouter key is shared for free model access only.</p>
        </div>
      </div>

      <AdBanner />
    </div>
  );
}
