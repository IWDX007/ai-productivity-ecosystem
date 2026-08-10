"use client";

import { useState, useRef, useCallback } from "react";
import { Copy, Download, Trash2, Upload, Check } from "lucide-react";

interface TextToolTemplateProps {
  title: string;
  description: string;
  placeholder?: string;
  showOutput?: boolean;
  onProcess?: (text: string) => string;
  statsPanel?: (text: string) => React.ReactNode;
  extraPanel?: (text: string) => React.ReactNode;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (text: string) => void;
    variant?: "primary" | "secondary";
  }>;
  badge?: string;
}

export default function TextToolTemplate({
  title,
  description,
  placeholder = "Type or paste your text here...",
  showOutput = false,
  onProcess,
  statsPanel,
  extraPanel,
  actions = [],
  badge = "Text Tool",
}: TextToolTemplateProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const output = onProcess ? onProcess(input) : "";

  const handleCopy = useCallback(async () => {
    const textToCopy = showOutput ? output : input;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [input, output, showOutput]);

  const handleDownload = useCallback(() => {
    const textToDownload = showOutput ? output : input;
    if (!textToDownload) return;
    const blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [input, output, showOutput, title]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInput(text);
    };
    reader.readAsText(file);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">
              {badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
              {title.split(" ").map((word, i) => (
                <span key={i}>
                  {i === title.split(" ").length - 1 ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </h1>
            <p className="text-theme-secondary max-w-2xl mx-auto text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Tool Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Input Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 items-center justify-between p-3 glass-card border border-theme rounded-xl">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={handleClear}
                  disabled={!input}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!input && !output}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!input && !output}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm btn-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Text Area */}
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[400px] md:min-h-[500px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 resize-y transition-colors font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Output Area */}
            {showOutput && output && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-theme-primary">Output:</label>
                <textarea
                  value={output}
                  readOnly
                  className="w-full min-h-[200px] p-4 bg-theme-card border border-crimson-500/20 rounded-xl text-theme-primary resize-y font-mono text-sm"
                />
              </div>
            )}

            {/* Custom Actions */}
            {actions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => action.onClick(input)}
                    disabled={!input}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                      action.variant === "primary"
                        ? "btn-primary border-0"
                        : "bg-theme-secondary hover:bg-crimson-500/10 border border-theme text-theme-primary"
                    }`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            {statsPanel && statsPanel(input)}
            {extraPanel && extraPanel(input)}
          </div>
        </div>
      </section>
    </>
  );
}