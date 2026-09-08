"use client";

import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import type {AffiliateAccount} from "@/content/affiliate";
import {generateReferralCode} from "@/lib/affiliate";

const STORAGE_KEY = "ciwi.affiliate.session";

type AffiliateSession = {
  account: AffiliateAccount;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type AffiliateContextValue = {
  account: AffiliateAccount | null;
  isAuthed: boolean;
  isHydrated: boolean;
  register: (input: RegisterInput) => AffiliateAccount;
  login: (input: LoginInput) => AffiliateAccount;
  generateReferral: () => void;
  logout: () => void;
};

const AffiliateContext = createContext<AffiliateContextValue | null>(null);

function readSession(): AffiliateSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw) as AffiliateSession;
    const account = session?.account;

    if (!account || typeof account.email !== "string") {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function persistSession(session: AffiliateSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function buildAccount(name: string, email: string): AffiliateAccount {
  return {
    id: crypto.randomUUID(),
    name,
    email,
    referralCode: null,
    status: "active",
    joinedAt: new Date().toISOString(),
  };
}

export function AffiliateProvider({children}: {children: ReactNode}) {
  const [account, setAccount] = useState<AffiliateAccount | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setAccount(readSession()?.account ?? null);
    setIsHydrated(true);
  }, []);

  function register(input: RegisterInput) {
    const nextAccount = buildAccount(input.name, input.email);
    persistSession({account: nextAccount});
    setAccount(nextAccount);
    return nextAccount;
  }

  function login(input: LoginInput) {
    const existing = readSession();
    const nextAccount =
      existing && existing.account.email === input.email
        ? existing.account
        : buildAccount(input.email.split("@")[0] || input.email, input.email);

    persistSession({account: nextAccount});
    setAccount(nextAccount);
    return nextAccount;
  }

  function generateReferral() {
    setAccount((current) => {
      if (!current || current.referralCode) {
        return current;
      }

      const nextAccount = {...current, referralCode: generateReferralCode()};
      persistSession({account: nextAccount});
      return nextAccount;
    });
  }

  function logout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setAccount(null);
  }

  return (
    <AffiliateContext.Provider
      value={{account, isAuthed: Boolean(account), isHydrated, register, login, generateReferral, logout}}
    >
      {children}
    </AffiliateContext.Provider>
  );
}

export function useAffiliate() {
  const context = useContext(AffiliateContext);

  if (!context) {
    throw new Error("useAffiliate must be used within an AffiliateProvider.");
  }

  return context;
}
