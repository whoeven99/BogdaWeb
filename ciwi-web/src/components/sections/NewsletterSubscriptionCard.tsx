"use client";

import {useState, type FormEvent} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";

type NewsletterSubscriptionCardProps = {
  source: string;
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    helperText: string;
    successMessage: string;
    errorMessage: string;
    highlights: readonly string[];
  };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadCaptureResponse = {
  ok: boolean;
  message: string;
};

export function NewsletterSubscriptionCard({source, copy}: NewsletterSubscriptionCardProps) {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage(copy.errorMessage);
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          entryType: "newsletter",
          email: normalizedEmail,
          locale,
          source,
        }),
      });

      const data = (await response.json()) as LeadCaptureResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || copy.errorMessage);
      }

      setEmail("");
      setStatus("success");
      setMessage(data.message || copy.successMessage);
    } catch {
      setStatus("error");
      setMessage(copy.errorMessage);
    }
  }

  return (
    <div className="subscription-card">
      <div className="subscription-card__content">
        <span className="section-heading__eyebrow">{copy.eyebrow}</span>
        <h3>{copy.title}</h3>
        <p className="quote">{copy.description}</p>
        <div className="subscription-card__highlights" aria-label="Subscription benefits">
          {copy.highlights.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      </div>
      <form className="subscription-form" onSubmit={handleSubmit}>
        <label className="subscription-form__field">
          <span className="subscription-form__label">{locale === "zh-cn" ? "邮箱" : "Email"}</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage(null);
              }
            }}
            placeholder={copy.placeholder}
            autoComplete="email"
            aria-invalid={status === "error"}
          />
        </label>
        <button type="submit" className="button button--primary subscription-form__submit" disabled={status === "loading"}>
          {status === "loading" ? (locale === "zh-cn" ? "提交中..." : "Submitting...") : copy.buttonLabel}
        </button>
        <p className={`subscription-form__message subscription-form__message--${status}`}>{message ?? copy.helperText}</p>
      </form>
    </div>
  );
}
