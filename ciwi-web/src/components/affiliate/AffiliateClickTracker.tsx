"use client";

import {useEffect} from "react";

export function AffiliateClickTracker({code, product}: {code: string; product?: string}) {
  useEffect(() => {
    if (!code) {
      return;
    }

    void fetch("/api/affiliate/click/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({code, product}),
      credentials: "same-origin",
    });
  }, [code, product]);

  return null;
}
