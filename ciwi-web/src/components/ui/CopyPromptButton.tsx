"use client";

import {useState} from "react";

type CopyPromptButtonProps = {
  text: string;
  label?: string;
  successLabel?: string;
  errorLabel?: string;
};

export function CopyPromptButton({
  text,
  label = "Copy prompt",
  successLabel = "Prompt copied. Paste it into your preferred AI assistant or Shopify AI workflow.",
  errorLabel = "Copy is unavailable. Select and copy the prompt text above.",
}: CopyPromptButtonProps) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4500);
  }

  const message = status === "ok" ? successLabel : status === "error" ? errorLabel : "";

  return (
    <div className="space-y-2">
      <button type="button" className="ui-btn ui-btn--secondary" onClick={handleCopy}>
        {label}
      </button>
      {message ? (
        <p role="status" className="text-sm text-slate-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
