"use client";

import {useState, type FormEvent} from "react";
import {useRouter} from "next/navigation";

import {useAffiliate} from "@/components/providers/AffiliateProvider";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {AffiliateCopy} from "@/content/affiliate";
import type {Locale} from "@/lib/i18n";
import {localizeHref} from "@/lib/i18n";

type LoginFormProps = {
  locale: Locale;
  copy: AffiliateCopy["login"];
};

type FormState = {
  email: string;
  password: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export function LoginForm({locale, copy}: LoginFormProps) {
  const {login} = useAffiliate();
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage(null);

    try {
      login(formState);
      router.push(localizeHref(locale, "/affiliate/dashboard"));
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
      <form className="lead-form" onSubmit={handleSubmit}>
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
          <span className="lead-form__label">{copy.fields.password}</span>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={(event) => updateField("password", event.target.value)}
            placeholder={copy.placeholders.password}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" className="button button--primary lead-form__submit" disabled={status === "loading"}>
          {status === "loading" ? copy.submittingLabel : copy.submitLabel}
        </button>
        <p className={`lead-form__message lead-form__message--${status === "error" ? "error" : "idle"}`}>
          {message ?? (
            <>
              {copy.registerPrompt}{" "}
              <LocalizedLink href="/affiliate/register">{copy.registerLinkLabel}</LocalizedLink>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
