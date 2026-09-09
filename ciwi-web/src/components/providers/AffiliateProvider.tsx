"use client";

import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import type {AffiliateAccount} from "@/content/affiliate";
import {
  fetchAffiliateAccount,
  generateAffiliateReferral,
  loginAffiliateAccount,
  logoutAffiliateAccount,
  registerAffiliateAccount,
} from "@/lib/affiliate-api";

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
  register: (input: RegisterInput) => Promise<AffiliateAccount>;
  login: (input: LoginInput) => Promise<AffiliateAccount>;
  generateReferral: () => Promise<void>;
  logout: () => Promise<void>;
};

const AffiliateContext = createContext<AffiliateContextValue | null>(null);

export function AffiliateProvider({children}: {children: ReactNode}) {
  const [account, setAccount] = useState<AffiliateAccount | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchAffiliateAccount()
      .then((nextAccount) => {
        if (!cancelled) {
          setAccount(nextAccount);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsHydrated(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function register(input: RegisterInput) {
    const nextAccount = await registerAffiliateAccount(input);
    setAccount(nextAccount);
    return nextAccount;
  }

  async function login(input: LoginInput) {
    const nextAccount = await loginAffiliateAccount(input);
    setAccount(nextAccount);
    return nextAccount;
  }

  async function generateReferral() {
    const nextAccount = await generateAffiliateReferral();
    setAccount(nextAccount);
  }

  async function logout() {
    await logoutAffiliateAccount();
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
