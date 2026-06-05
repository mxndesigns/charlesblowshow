"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailSignup({
  id,
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in. Watch your inbox for the first dispatch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className="rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-cream"
        role="status"
        aria-live="polite"
      >
        <p className="font-serif text-lg">✓ {message}</p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={
        compact
          ? "flex flex-col gap-2 sm:flex-row"
          : "flex flex-col gap-3 sm:flex-row"
      }
      noValidate
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="w-full flex-1 rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-cream placeholder:text-muted outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 disabled:opacity-60"
        aria-invalid={status === "error"}
        aria-describedby={message ? `${id}-msg` : undefined}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-lg bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get the dispatch"}
      </button>
      {message && status === "error" && (
        <p id={`${id}-msg`} className="text-sm text-ember sm:basis-full">
          {message}
        </p>
      )}
    </form>
  );
}
