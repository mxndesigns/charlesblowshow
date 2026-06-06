/**
 * Single-seat auth for the internal console (plan §2: "don't over-build this").
 *
 * A password is posted to /api/auth; on match we set an httpOnly session cookie
 * whose value is a server secret. `proxy.ts` gates the /dashboard group by
 * checking that cookie. Both values come from env, with dev defaults so the app
 * runs out of the box — CHANGE THESE before any public deploy (see .env.example).
 */

export const SESSION_COOKIE = "cbs_session";

/** The password the operator types on the login screen. */
export function getDashboardPassword(): string {
  return process.env.DASHBOARD_PASSWORD || "charlesblow";
}

/** Opaque session token stored in the cookie (never the password itself). */
export function getSessionSecret(): string {
  return (
    process.env.DASHBOARD_SESSION_SECRET ||
    "cbs-dev-session-secret-change-me"
  );
}

/** 30 days. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
