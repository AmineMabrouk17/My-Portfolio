"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";

const EMAIL = "amx72001@gmail.com";

type FieldErrors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailtoOpened, setMailtoOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildMailto = useCallback(() => {
    const subject = encodeURIComponent(`${t("contact.form.subject")} — ${name}`);
    const body = encodeURIComponent(
      `${t("contact.form.name")}: ${name}\n` +
        `${t("contact.form.email")}: ${email}\n` +
        (budget ? `${t("contact.form.budget")}: ${budget}\n` : "") +
        `\n${t("contact.form.message")}:\n${message}`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }, [budget, email, message, name, t]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = t("contact.form.errorName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = t("contact.form.errorEmail");
    if (!message.trim()) next.message = t("contact.form.errorMessage");
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    // We can open a mail client, but we cannot confirm delivery — so the form
    // never claims the message was sent.
    window.location.href = buildMailto();
    setMailtoOpened(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the address is still selectable on screen.
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setBudget("");
    setMessage("");
    setErrors({});
    setMailtoOpened(false);
  };

  const inputClass =
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted-2)] outline-none transition-all duration-200 focus:bg-white/[0.06] focus:border-[var(--color-accent)]";

  const fieldClass = (invalid?: string) =>
    `${inputClass} ${
      invalid
        ? "border-[var(--color-accent)]"
        : "border-[var(--color-field-border)]"
    }`;

  return (
    <section id="contact" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[color-mix(in_srgb,var(--color-accent)_6%,transparent)] to-[color-mix(in_srgb,var(--color-accent-2)_6%,transparent)] border border-[var(--color-border-2)] rounded-[28px] py-[60px] px-[60px] max-md:py-10 max-md:px-6 relative overflow-hidden">
            <div
              className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%)",
              }}
            />

            <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-3 relative">
              {t("contact.num")}
            </div>
            <AnimatedText
              as="h2"
              text={t("contact.h2")}
              className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none mb-3.5 relative"
            />
            <p className="relative mb-8 max-w-[520px] text-pretty text-base text-[var(--color-muted)]">
              {t("contact.text")}
            </p>

            {/* Always-visible fallback: a webmail-only visitor must never be
                trapped behind a mailto: that silently did nothing. */}
            <div className="relative mb-8 flex flex-wrap items-center gap-3">
              <span className="text-[14px] font-medium text-[var(--color-muted)]">
                {t("contact.direct")}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="contact-email text-[16px] font-semibold text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-field-border)] px-4 text-[12px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {copied ? t("contact.copied") : t("contact.copy")}
              </button>
            </div>

            {mailtoOpened ? (
              <div
                role="status"
                aria-live="polite"
                className="relative rounded-2xl border border-[var(--color-border-2)] bg-white/[0.03] p-6"
              >
                <div className="text-[var(--color-text)] text-lg font-semibold mb-2">
                  {t("contact.form.sentTitle")}
                </div>
                <p className="text-[var(--color-muted)] text-sm max-w-[520px] mb-5">
                  {t("contact.form.sentHint")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={buildMailto()}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-dark)] transition-transform hover:-translate-y-0.5"
                  >
                    {t("contact.form.openAgain")}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--color-field-border)] px-5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-white/[0.06]"
                  >
                    {copied ? t("contact.copied") : t("contact.copy")}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {t("contact.form.sendAnother")}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative grid grid-cols-2 gap-4 max-md:grid-cols-1"
                noValidate
              >
                <label className="flex flex-col gap-1.5">
                  <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide">
                    {t("contact.form.name")}
                    <span className="text-[var(--color-accent)] ml-0.5">*</span>
                  </span>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contact.form.namePlaceholder")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={fieldClass(errors.name)}
                  />
                  {errors.name && (
                    <span
                      id="contact-name-error"
                      className="text-[12px] text-[var(--color-accent)]"
                    >
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide">
                    {t("contact.form.email")}
                    <span className="text-[var(--color-accent)] ml-0.5">*</span>
                  </span>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.form.emailPlaceholder")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={fieldClass(errors.email)}
                  />
                  {errors.email && (
                    <span
                      id="contact-email-error"
                      className="text-[12px] text-[var(--color-accent)]"
                    >
                      {errors.email}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide">
                    {t("contact.form.budget")}
                  </span>
                  <input
                    id="contact-budget"
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t("contact.form.budgetPlaceholder")}
                    className={fieldClass()}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide">
                    {t("contact.form.message")}
                    <span className="text-[var(--color-accent)] ml-0.5">*</span>
                  </span>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className={`${fieldClass(errors.message)} resize-none`}
                  />
                  {errors.message && (
                    <span
                      id="contact-message-error"
                      className="text-[12px] text-[var(--color-accent)]"
                    >
                      {errors.message}
                    </span>
                  )}
                </label>

                <div className="col-span-2 max-md:col-span-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[50px] items-center gap-2.5 px-7 rounded-xl font-semibold text-sm bg-[var(--color-accent)] text-[var(--color-accent-dark)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                    {t("contact.form.submit")}
                  </button>
                </div>
              </form>
            )}

            <div className="flex gap-3.5 justify-start relative flex-wrap mt-10">
              <a
                href="https://github.com/AmineMabrouk17"
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-[50px] items-center gap-2.5 px-6 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-accent)] border border-[var(--color-accent)]/40 transition-all duration-200 hover:bg-white/[0.08] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="tel:+21627865121"
                className="inline-flex min-h-[50px] items-center gap-2.5 px-6 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-field-border)] transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +216 27 865 121
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
