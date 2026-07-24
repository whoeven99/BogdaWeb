"use client";

import {useState, type FormEvent} from "react";

type NewsletterSubscriptionCardProps = {
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

export function NewsletterSubscriptionCard({copy}: NewsletterSubscriptionCardProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage(copy.errorMessage);
      return;
    }

    setEmail(normalizedEmail);
    setStatus("success");
    setMessage(copy.successMessage);
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
          <span className="subscription-form__label">Email</span>
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
        <button type="submit" className="button button--primary subscription-form__submit">
          {copy.buttonLabel}
        </button>
        <p className={`subscription-form__message subscription-form__message--${status}`}>{message ?? copy.helperText}</p>
      </form>
    </div>
  );
}
