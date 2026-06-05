import { NextResponse } from "next/server";

// Simple, dependency-free email validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/subscribe
 * Captures an email for the launch list.
 *
 * Integration: set RESEND_API_KEY + RESEND_AUDIENCE_ID to push contacts into a
 * Resend audience. With no keys set, the endpoint still returns success and logs
 * the signup so the form works in dev and during the soft-launch — wire a real
 * provider (Resend / Substack / Beehiiv) before going public. See .env.example.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (apiKey && audienceId) {
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        }
      );

      // 409 = already a contact; treat as success.
      if (!res.ok && res.status !== 409) {
        const detail = await res.text();
        console.error("[subscribe] Resend error", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "We couldn't add you right now. Try again soon." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("[subscribe] Resend request failed", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't add you right now. Try again soon." },
        { status: 502 }
      );
    }
  } else {
    // No provider configured yet — log so soft-launch signups aren't lost silently.
    console.log(`[subscribe] (no provider configured) captured: ${email}`);
  }

  return NextResponse.json({ ok: true });
}
