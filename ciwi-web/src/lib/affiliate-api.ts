import type {AffiliateAccount, ProgressStats} from "@/content/affiliate";

type AffiliateApiResponse = {
  ok?: boolean;
  message?: string;
  account?: AffiliateAccount;
  stats?: ProgressStats;
};

export const emptyAffiliateStats: ProgressStats = {
  clicks: 0,
  signups: 0,
  activated: 0,
  conversionRate: 0,
  trackedRevenue: 0,
  commissionEarned: 0,
  currency: "USD",
};

async function parseResponse(response: Response): Promise<AffiliateApiResponse> {
  try {
    return (await response.json()) as AffiliateApiResponse;
  } catch {
    return {};
  }
}

async function requestAccount(url: string, init?: RequestInit): Promise<AffiliateAccount> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "same-origin",
  });
  const payload = await parseResponse(response);

  if (!response.ok || !payload.ok || !payload.account) {
    throw new Error(payload.message || "Affiliate request failed.");
  }

  return payload.account;
}

export function fetchAffiliateAccount() {
  return fetch("/api/affiliate/me/", {credentials: "same-origin"}).then(async (response) => {
    if (response.status === 401) {
      return null;
    }

    const payload = await parseResponse(response);

    if (!response.ok || !payload.ok || !payload.account) {
      return null;
    }

    return payload.account;
  });
}

export function registerAffiliateAccount(input: {name: string; email: string; password: string}) {
  return requestAccount("/api/affiliate/register/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginAffiliateAccount(input: {email: string; password: string}) {
  return requestAccount("/api/affiliate/login/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logoutAffiliateAccount() {
  return fetch("/api/affiliate/logout/", {
    method: "POST",
    credentials: "same-origin",
  });
}

export function generateAffiliateReferral() {
  return requestAccount("/api/affiliate/referral/", {
    method: "POST",
  });
}

export function fetchAffiliateStats() {
  return fetch("/api/affiliate/stats/", {credentials: "same-origin"}).then(async (response) => {
    const payload = await parseResponse(response);

    if (!response.ok || !payload.ok || !payload.stats) {
      return emptyAffiliateStats;
    }

    return payload.stats;
  });
}
