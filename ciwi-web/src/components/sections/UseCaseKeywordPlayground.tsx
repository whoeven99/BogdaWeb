"use client";

import {useMemo, useState} from "react";
import {SectionHeading} from "@/components/ui/SectionHeading";

type UseCaseKeywordVariable = {
  key: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
};

type UseCaseKeywordTemplate = {
  label: string;
  template: string;
};

type UseCaseKeywordPlaygroundProps = {
  eyebrow?: string;
  title: string;
  description: string;
  variablesTitle: string;
  previewTitle: string;
  previewDescription: string;
  variables: UseCaseKeywordVariable[];
  templates: UseCaseKeywordTemplate[];
  note?: string;
};

function applyTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return values[key] ?? "";
  });
}

export function UseCaseKeywordPlayground({
  eyebrow,
  title,
  description,
  variablesTitle,
  previewTitle,
  previewDescription,
  variables,
  templates,
  note,
}: UseCaseKeywordPlaygroundProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(variables.map((item) => [item.key, item.defaultValue]))
  );

  const renderedTemplates = useMemo(
    () =>
      templates.map((item) => ({
        ...item,
        value: applyTemplate(item.template, values),
      })),
    [templates, values]
  );

  return (
    <section className="page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="use-case-playground">
        <div className="surface-card section-stack">
          <div>
            <h3>{variablesTitle}</h3>
            <p className="quote">{description}</p>
          </div>
          <div className="use-case-playground__fields">
            {variables.map((item) => (
              <label key={item.key} className="lead-form__field">
                <span className="lead-form__label">{item.label}</span>
                <input
                  type="text"
                  value={values[item.key] ?? ""}
                  placeholder={item.placeholder}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [item.key]: event.target.value,
                    }))
                  }
                />
              </label>
            ))}
          </div>
        </div>
        <div className="surface-card section-stack">
          <div>
            <h3>{previewTitle}</h3>
            <p className="quote">{previewDescription}</p>
          </div>
          <div className="use-case-playground__outputs">
            {renderedTemplates.map((item) => (
              <article key={item.label} className="use-case-playground__output">
                <div className="use-case-playground__output-label">{item.label}</div>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
          {note ? <p className="quote">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}
