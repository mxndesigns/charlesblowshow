/**
 * Revenue engine — ported from `CharlesBlowShow_Revenue_Model_v1.xlsx`.
 *
 * The spreadsheet is an Assumptions → Projection → Summary model with three
 * revenue legs (membership, sponsorship, platform/ad). Rather than render the
 * file, we re-implement its formulas as pure functions so the dashboard can be
 * reactive — feeding a live subscriber count in and getting revenue out.
 *
 * IMPORTANT: only `v1` is the Charles Blow Show model. The `Global_v2.xlsx`
 * file is legacy Gelatin data — do NOT port it. See CBS-CMS-Dashboard-Plan §5.
 *
 * Every formula below maps 1:1 to a cell in the xlsx; cell refs are noted in
 * comments so the port stays auditable against the source of truth.
 */

export interface Assumptions {
  // ── Audience & funnel (Assumptions!C5–C10) ──
  /** Starting YouTube subscribers, Month 1 (C5). */
  startSubscribers: number;
  /** Target YouTube subscribers, Month 12 — the success-ladder milestone (C6). */
  targetSubscribers: number;
  /** Avg monthly views generated per subscriber (C7). */
  viewsPerSubscriber: number;
  /** View → email-signup conversion (C8). */
  viewToEmail: number;
  /** Email → paid-member conversion (C9). */
  emailToPaid: number;
  /** Monthly member churn (C10). */
  monthlyChurn: number;

  // ── Membership mix & pricing (Assumptions!C13–C17) ──
  /** Share on the Member tier vs Founding (C13). Remainder are Founding. */
  shareMemberTier: number;
  /** Of Members, share billed annually (C14). Rest are monthly. */
  shareAnnual: number;
  /** Member price, monthly $ (C15). */
  memberMonthly: number;
  /** Member price, annual $ (C16). */
  memberAnnual: number;
  /** Founding Member price, annual $ (C17). */
  foundingAnnual: number;

  // ── Sponsorship (Assumptions!C20–C25) ──
  /** Episodes per month (C20). Kept for reference; the v1 sponsorship formula
   *  derives impressions from monthly views, not episode count. */
  episodesPerMonth: number;
  /** Avg sponsor reads per episode (C21). */
  readsPerEpisode: number;
  /** Pre-roll CPM $ (C22). */
  preRollCpm: number;
  /** Mid-roll CPM $ (C23). */
  midRollCpm: number;
  /** Share of sponsor slots actually sold (C25). */
  sellThrough: number;

  // ── Platform & ad revenue (Assumptions!C28–C29) ──
  /** YouTube/podcast RPM per 1,000 views (C28). */
  rpm: number;
  /** Share of views monetized (C29). */
  shareMonetized: number;
}

/** Default assumptions — the exact blue-cell inputs from `..._Revenue_Model_v1.xlsx`. */
export const DEFAULT_ASSUMPTIONS: Assumptions = {
  startSubscribers: 800,
  targetSubscribers: 10_000,
  viewsPerSubscriber: 4,
  viewToEmail: 0.015,
  emailToPaid: 0.03,
  monthlyChurn: 0.05,
  shareMemberTier: 0.85,
  shareAnnual: 0.3,
  memberMonthly: 7,
  memberAnnual: 70,
  foundingAnnual: 150,
  episodesPerMonth: 40,
  readsPerEpisode: 1.5,
  preRollCpm: 30,
  midRollCpm: 25,
  sellThrough: 0.6,
  rpm: 4,
  shareMonetized: 0.7,
};

/** Blended sponsor CPM — Assumptions!C24 `=AVERAGE(C22:C23)`. */
export function blendedCpm(a: Assumptions): number {
  return (a.preRollCpm + a.midRollCpm) / 2;
}

/** Membership MRR for a given count of Member-tier and Founding-tier members.
 *  Projection!row16: monthly Members + annual Members (price/12) + Founding (price/12). */
function membershipMrr(a: Assumptions, memberTier: number, foundingTier: number): number {
  return (
    memberTier * (1 - a.shareAnnual) * a.memberMonthly +
    memberTier * a.shareAnnual * (a.memberAnnual / 12) +
    foundingTier * (a.foundingAnnual / 12)
  );
}

/** Sponsorship revenue for a given monthly-views figure.
 *  Projection!row18 `=reads/ep * sell-through * (views/1000) * blendedCPM`. */
function sponsorshipRevenue(a: Assumptions, monthlyViews: number): number {
  return a.readsPerEpisode * a.sellThrough * (monthlyViews / 1000) * blendedCpm(a);
}

/** Platform / ad revenue for a given monthly-views figure.
 *  Projection!row19 `=views * shareMonetized / 1000 * RPM`. */
function platformRevenue(a: Assumptions, monthlyViews: number): number {
  return (monthlyViews * a.shareMonetized) / 1000 * a.rpm;
}

export interface Forecast {
  subscribers: number;
  monthlyViews: number;
  members: number;
  memberTier: number;
  foundingTier: number;
  /** Recurring monthly revenue from memberships. */
  mrr: number;
  /** Annual recurring revenue (MRR × 12). */
  arr: number;
  membership: number;
  sponsorship: number;
  platform: number;
  /** Total blended monthly revenue across all three legs. */
  blended: number;
  /** Share of blended revenue by leg (sums to 1). */
  split: { membership: number; sponsorship: number; platform: number };
}

/**
 * Steady-state forecast at a fixed subscriber count.
 *
 * This is the function the dashboard feeds the *live* subscriber total into,
 * and how the 100k scenario is computed (`forecastAtScale(a, 100_000)`).
 *
 * At equilibrium, new paying members equal churned members, so the membership
 * base settles at `newPaying / churn`. Sponsorship and platform legs scale
 * directly off monthly views. The result answers: "sitting at N subscribers,
 * what do the monthly economics look like?"
 */
export function forecastAtScale(a: Assumptions, subscribers: number): Forecast {
  const monthlyViews = subscribers * a.viewsPerSubscriber;
  const newEmail = monthlyViews * a.viewToEmail;
  const newPaying = newEmail * a.emailToPaid;
  // Steady-state member base: inflow (newPaying) balances outflow (members * churn).
  const members = a.monthlyChurn > 0 ? newPaying / a.monthlyChurn : newPaying;

  const memberTier = members * a.shareMemberTier;
  const foundingTier = members * (1 - a.shareMemberTier);

  const membership = membershipMrr(a, memberTier, foundingTier);
  const sponsorship = sponsorshipRevenue(a, monthlyViews);
  const platform = platformRevenue(a, monthlyViews);
  const blended = membership + sponsorship + platform;

  return {
    subscribers,
    monthlyViews,
    members,
    memberTier,
    foundingTier,
    mrr: membership,
    arr: membership * 12,
    membership,
    sponsorship,
    platform,
    blended,
    split: {
      membership: blended > 0 ? membership / blended : 0,
      sponsorship: blended > 0 ? sponsorship / blended : 0,
      platform: blended > 0 ? platform / blended : 0,
    },
  };
}

export interface MonthRow {
  month: number; // 1–12
  subscribers: number;
  monthlyViews: number;
  newEmail: number;
  emailList: number;
  newPaying: number;
  churned: number;
  members: number;
  memberTier: number;
  foundingTier: number;
  mrr: number;
  membership: number;
  sponsorship: number;
  platform: number;
  blended: number;
  cumulative: number;
  arr: number;
}

export interface Projection {
  months: MonthRow[];
  summary: {
    members: number;
    memberTier: number;
    foundingTier: number;
    emailList: number;
    subscribers: number;
    mrr: number;
    arr: number;
    year1: {
      membership: number;
      sponsorship: number;
      platform: number;
      total: number;
    };
    split: { membership: number; sponsorship: number; platform: number };
  };
}

/**
 * Full 12-month projection — the xlsx `Projection` + `Summary` sheets.
 *
 * Subscribers ramp linearly from `startSubscribers` (M1) to `targetSubscribers`
 * (M12): `start + (target-start)*(m-1)/11` (Projection!row5). This is the base
 * plan to 10k; it is NOT the 100k stretch scenario.
 */
export function project(a: Assumptions = DEFAULT_ASSUMPTIONS): Projection {
  const months: MonthRow[] = [];
  let emailList = 0;
  let members = 0;

  for (let m = 1; m <= 12; m++) {
    const subscribers =
      a.startSubscribers + (a.targetSubscribers - a.startSubscribers) * (m - 1) / 11;
    const monthlyViews = subscribers * a.viewsPerSubscriber;
    const newEmail = monthlyViews * a.viewToEmail;
    emailList += newEmail;

    const newPaying = newEmail * a.emailToPaid; // gross (Projection!row9)
    const churned = m === 1 ? 0 : members * a.monthlyChurn; // (Projection!row10)
    members = members + newPaying - churned; // end-of-month (Projection!row11)

    const memberTier = members * a.shareMemberTier;
    const foundingTier = members * (1 - a.shareMemberTier);

    const mrr = membershipMrr(a, memberTier, foundingTier);
    const membership = mrr; // recognized monthly = MRR (Projection!row17)
    const sponsorship = sponsorshipRevenue(a, monthlyViews);
    const platform = platformRevenue(a, monthlyViews);
    const blended = membership + sponsorship + platform;
    const prevCumulative = m === 1 ? 0 : months[m - 2].cumulative;

    months.push({
      month: m,
      subscribers,
      monthlyViews,
      newEmail,
      emailList,
      newPaying,
      churned,
      members,
      memberTier,
      foundingTier,
      mrr,
      membership,
      sponsorship,
      platform,
      blended,
      cumulative: prevCumulative + blended,
      arr: mrr * 12,
    });
  }

  const last = months[11];
  const year1 = {
    membership: months.reduce((s, r) => s + r.membership, 0),
    sponsorship: months.reduce((s, r) => s + r.sponsorship, 0),
    platform: months.reduce((s, r) => s + r.platform, 0),
    total: 0,
  };
  year1.total = year1.membership + year1.sponsorship + year1.platform;

  return {
    months,
    summary: {
      members: last.members,
      memberTier: last.memberTier,
      foundingTier: last.foundingTier,
      emailList: last.emailList,
      subscribers: last.subscribers,
      mrr: last.mrr,
      arr: last.arr,
      year1,
      split: {
        membership: year1.total > 0 ? year1.membership / year1.total : 0,
        sponsorship: year1.total > 0 ? year1.sponsorship / year1.total : 0,
        platform: year1.total > 0 ? year1.platform / year1.total : 0,
      },
    },
  };
}
