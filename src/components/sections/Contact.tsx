"use client";

import { useEffect, useRef, useState } from "react";
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
  const [handoff, setHandoff] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "failed">("idle");
  const sentRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    if (handoff) sentRef.current?.focus();
  }, [handoff]);

  const compose = () => {
    const subject = `${t("contact.form.subject")} — ${name}`;
    const body =
      `${t("contact.form.name")}: ${name}\n` +
      `${t("contact.form.email")}: ${email}\n` +
      (budget ? `${t("contact.form.budget")}: ${budget}\n` : "") +
      `\n${t("contact.form.message")}:\n${message}`;
    return { subject, body };
  };

  const mailtoHref = () => {
    const { subject, body } = compose();
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const gmailHref = () => {
    const { subject, body } = compose();
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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

    // We can open a composer, but we cannot confirm delivery — so the page
    // never claims the message was sent.
    window.location.href = mailtoHref();
    setHandoff(true);
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
    } catch {
      setCopied("failed");
      const el = document.getElementById("contact-address");
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied("idle"), 3000);
  };

  const copyAddress = () => copyText(EMAIL);
  const copyMessage = () => {
    const { subject, body } = compose();
    void copyText(`${t("contact.form.subject")}: ${subject}\n\n${body}`);
  };

  const inputClass =
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-[var(--color-text)] text-base placeholder:text-[var(--color-muted-2)] outline-none transition-all duration-200 focus:bg-white/[0.06] focus:border-[var(--color-accent)]";

  const fieldClass = (invalid?: string) =>
    `${inputClass} ${
      invalid ? "border-[var(--color-accent)]" : "border-[var(--color-field-border)]"
    }`;

  const errorCount = Object.keys(errors).length;

  return (
    <section id="contact" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[color-mix(in_srgb,var(--color-accent)_6%,transparent)] to-[color-mix(in_srgb,var(--color-accent-2)_6%,transparent)] border border-[var(--color-border-2)] rounded-[28px] py-[60px] px-[60px] max-md:py-10 max-md:px-6 relative overflow-hidden">
            <div
              aria-hidden="true"
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
              className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-[1.05] mb-3.5 relative"
            />
            <p className="text-[var(--color-muted)] text-[16px] max-w-[560px] mb-4 relative">
              {t("contact.text")}
            </p>
            <p className="text-[var(--color-muted-2)] text-[14px] max-w-[560px] mb-8 relative">
              {t("contact.reassure")}
            </p>

            {/* Always-visible fallback: a webmail-only visitor must never be
                trapped behind a mailto: that silently did nothing. */}
            <div className="relative mb-8 flex flex-wrap items-center gap-3">
              <span className="text-[14px] font-medium text-[var(--color-muted)]">
                {t("contact.direct")}
              </span>
              <bdi
                id="contact-address"
                className="text-[16px] font-semibold text-[var(--color-accent)]"
              >
                {EMAIL}
              </bdi>
              <button
                type="button"
                onClick={copyAddress}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-field-border)] px-4 text-[13px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {copied === "ok"
                  ? t("contact.copied")
                  : copied === "failed"
                    ? t("contact.copyHint")
                    : t("contact.copy")}
              </button>
            </div>

            {handoff ? (
              <div
                ref={sentRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="relative rounded-2xl border border-[var(--color-border-2)] bg-white/[0.03] p-6 outline-none"
              >
                <div className="text-[var(--color-text)] text-lg font-semibold mb-2">
                  {t("contact.form.sentTitle")}
                </div>
                <p className="text-[var(--color-muted)] text-[15px] max-w-[560px] mb-5">
                  {t("contact.form.sentHint")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={gmailHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-dark)] no-underline transition-transform hover:-translate-y-0.5"
                  >
                    {t("contact.form.gmail")}
                  </a>
                  <a
                    href={mailtoHref()}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--color-field-border)] px-5 text-sm font-semibold text-[var(--color-text)] no-underline hover:bg-white/[0.06]"
                  >
                    {t("contact.form.openAgain")}
                  </a>
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {copied === "ok" ? t("contact.copied") : t("contact.copyMessage")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHandoff(false)}
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
                {errorCount > 0 && (
                  <p
                    role="alert"
                    className="col-span-2 max-md:col-span-1 rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-2.5 text-[13px] text-[var(--color-accent)]"
                  >
                    {t("contact.form.errorSummary")}
                  </p>
                )}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[var(--color-muted)] text-[13px] font-medium tracking-wide"
                  >
                    {t("contact.form.name")}
                    <span aria-hidden="true" className="text-[var(--color-accent)] ms-0.5">*</span>
                  </label>
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
                    <span id="contact-name-error" className="text-[13px] text-[var(--color-accent)]">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-[var(--color-muted)] text-[13px] font-medium tracking-wide"
                  >
                    {t("contact.form.email")}
                    <span aria-hidden="true" className="text-[var(--color-accent)] ms-0.5">*</span>
                  </label>
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
                    <span id="contact-email-error" className="text-[13px] text-[var(--color-accent)]">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-budget"
                    className="text-[var(--color-muted)] text-[13px] font-medium tracking-wide"
                  >
                    {t("contact.form.budget")}
                    <span className="ms-1 text-[var(--color-muted-2)]">
                      ({t("contact.optional")})
                    </span>
                  </label>
                  <input
                    id="contact-budget"
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t("contact.form.budgetPlaceholder")}
                    aria-describedby="contact-budget-help"
                    className={fieldClass()}
                  />
                  <span id="contact-budget-help" className="sr-only">
                    {t("contact.optional")}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[var(--color-muted)] text-[13px] font-medium tracking-wide"
                  >
                    {t("contact.form.message")}
                    <span aria-hidden="true" className="text-[var(--color-accent)] ms-0.5">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${fieldClass(errors.message)} resize-none`}
                  />
                  {errors.message && (
                    <span id="contact-message-error" className="text-[13px] text-[var(--color-accent)]">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="col-span-2 max-md:col-span-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[50px] items-center gap-2.5 px-7 rounded-xl font-semibold text-[15px] bg-[var(--color-accent)] text-[var(--color-accent-dark)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      className="rtl:-scale-x-100"
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
                className="inline-flex min-h-[50px] items-center gap-2.5 px-6 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-field-border)] transition-all duration-200 hover:bg-white/[0.08] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="tel:+21627865121"
                className="inline-flex min-h-[50px] items-center gap-2.5 px-6 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-field-border)] transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <bdi dir="ltr">+216 27 865 121</bdi>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
