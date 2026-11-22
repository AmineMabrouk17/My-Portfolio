"use client";

import Image from "next/image";
import { useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import styles from "./wordmark-hero.module.css";

/**
 * The first section: the name at wordmark scale, the portrait cut-out over the
 * letters, mono labels either side, one line of proof, and a signal strip.
 *
 * Motion is scroll-linked: one measured progress (0..1) is written to the
 * section as `--p`, and every layer derives from it in CSS. Measuring the
 * section's own box instead of listening for scroll keeps it correct under
 * Lenis, native scrolling, or a snapped container. Reduced motion leaves
 * `--p` at 0, so the composition is static.
 */
const liveWork = [
  { key: "proj.castcue.title", href: "https://cast-cue.cast-cue.workers.dev" },
  { key: "proj.budgetiq.title", href: "https://budgetiq-two.vercel.app" },
  { key: "proj.crypto.title", href: "https://crypto-stocks-web-taupe.vercel.app" },
];

export default function WordmarkHero() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  const dir = locale === "ar" ? -1 : 1;
  const word = t("wordmark.word") || "AMINE";
  const left = ["left1", "left2", "left3", "left4"].map((k) => t(`wordmark.${k}`));
  const right = ["right1", "right2", "right3", "right4"].map((k) => t(`wordmark.${k}`));
  const strip = ["strip1", "strip2", "strip3", "strip4", "strip5", "strip6"].map((k) =>
    t(`wordmark.${k}`),
  );

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label={t("wordmark.label")}
      style={{ "--dir": dir } as React.CSSProperties}
    >
      <div className={styles.glow} aria-hidden="true" />

      <p className={styles.meta}>
        <span className={styles.metaName}>{t("wordmark.owner")}</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span>{t("wordmark.role")}</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span className={styles.metaQuiet}>{t("wordmark.location")}</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span className={styles.status}>
          <i aria-hidden="true" />
          {t("wordmark.availability")}
        </span>
      </p>

      <h1 className={styles.wordmark}>
        <span className={styles.srOnly}>{t("wordmark.headline")}</span>
        <span className={styles.letters} aria-hidden="true">
          {word.split("").map((letter, i) => (
            <span key={`${letter}-${i}`} style={{ "--i": i } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </span>
      </h1>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.portrait}>
        <Image
          src="/hero-amine.png"
          alt={t("hero.portraitAlt")}
          width={691}
          height={569}
          priority
          sizes="(min-width: 800px) 42vw, 100vw"
        />
      </div>

      <ul className={`${styles.col} ${styles.colStart}`} aria-hidden="true">
        {left.map((item, i) => (
          <li key={item} style={{ "--i": i } as React.CSSProperties}>
            {i === 0 ? <b>{item}</b> : item}
          </li>
        ))}
      </ul>

      <ul className={`${styles.col} ${styles.colEnd}`} aria-hidden="true">
        {right.map((item, i) => (
          <li key={item} style={{ "--i": i } as React.CSSProperties}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <div className={styles.footLeft}>
        <p className={styles.summary}>{t("wordmark.summary")}</p>

        <ul className={styles.work}>
          {liveWork.map(({ key, href }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">↗</span>
                {t(key).split(" — ")[0]}
              </a>
            </li>
          ))}
        </ul>
        </div>

        <div className={styles.actions}>
          <a className={styles.btnPrimary} href="#contact">
            {t("hero.cta1")}
          </a>
          <a className={styles.btnGhost} href="#projects">
            {t("hero.cta2")}
          </a>
        </div>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {strip.map((item) => (
                <li key={`${copy}-${item}`}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
