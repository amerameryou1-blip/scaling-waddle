"use client";

import { useState } from "react";
import { classNames } from "@/lib/format";
import { ArrowIcon, CheckIcon } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {status === "done" ? (
        <div className="flex items-center gap-2 rounded-full border border-prism-cyan/30 bg-prism-cyan/10 px-4 py-3 text-sm text-prism-cyan">
          <CheckIcon className="h-4 w-4" />
          Welcome to the light. Check your inbox.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm text-mist placeholder:text-mist-dim focus:border-prism-violet/50 focus:outline-none focus:ring-2 focus:ring-prism-violet/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={classNames(
              "group flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-all hover:bg-mist",
              status === "loading" && "opacity-60"
            )}
          >
            Join
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-prism-pink">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
