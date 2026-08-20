"use client";

import {useState, type FormEvent} from "react";

import type {Locale} from "@/lib/i18n";

type WaitlistFormProps = {
  locale: Locale;
  copy: {
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      storeUrl: string;
      role: string;
      notes: string;
    };
    placeholders: {
      name: string;
      email: string;
      storeUrl: string;
      role: string;
      notes: string;
    };
    helperText: string;
    submitLabel: string;
    submittingLabel: string;
    errorMessage: string;
  };
};

type WaitlistResponse = {
  ok: boolean;
  message: string;
};

type FormState = {
  name: string;
  email: string;
  storeUrl: string;
  role: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  storeUrl: "",
  role: "",
  notes: "",
};

export function WaitlistForm({locale, copy}: WaitlistFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          entryType: "waitlist",
          source: "spark_waitlist",
          product: "Spark Shopify Analytics Agent",
          locale,
          ...formState,
        }),
      });

      const data = (await response.json()) as WaitlistResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || copy.errorMessage);
      }

      setFormState(initialState);
      setStatus("success");
      setMessage(data.message);
    } catch {
      setStatus("error");
      setMessage(copy.errorMessage);
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({...current, [field]: value}));

    if (status !== "idle") {
      setStatus("idle");
      setMessage(null);
    }
  }

  return (
    <div className="surface-card lead-form-card">
      <div className="lead-form-card__header">
        <h3>{copy.title}</h3>
        <p className="quote">{copy.description}</p>
      </div>
      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form__grid">
          <label className="lead-form__field">
            <span className="lead-form__label">{copy.fields.name}</span>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={copy.placeholders.name}
              autoComplete="name"
              required
            />
          </label>
          <label className="lead-form__field">
            <span className="lead-form__label">{copy.fields.email}</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={copy.placeholders.email}
              autoComplete="email"
              required
            />
          </label>
          <label className="lead-form__field">
            <span className="lead-form__label">{copy.fields.storeUrl}</span>
            <input
              type="text"
              name="storeUrl"
              value={formState.storeUrl}
              onChange={(event) => updateField("storeUrl", event.target.value)}
              placeholder={copy.placeholders.storeUrl}
              autoComplete="url"
            />
          </label>
          <label className="lead-form__field">
            <span className="lead-form__label">{copy.fields.role}</span>
            <input
              type="text"
              name="role"
              value={formState.role}
              onChange={(event) => updateField("role", event.target.value)}
              placeholder={copy.placeholders.role}
              autoComplete="organization-title"
            />
          </label>
        </div>
        <label className="lead-form__field">
          <span className="lead-form__label">{copy.fields.notes}</span>
          <textarea
            name="notes"
            value={formState.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder={copy.placeholders.notes}
            rows={5}
          />
        </label>
        <button type="submit" className="button button--primary lead-form__submit" disabled={status === "loading"}>
          {status === "loading" ? copy.submittingLabel : copy.submitLabel}
        </button>
        <p className={`lead-form__message lead-form__message--${status === "error" ? "error" : status === "success" ? "success" : "idle"}`}>
          {message ?? copy.helperText}
        </p>
      </form>
    </div>
  );
}
