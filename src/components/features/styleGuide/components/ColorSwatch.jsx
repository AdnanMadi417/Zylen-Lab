import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// ── Colour maths ────────────────────────────────────────────────────────────

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

export const toCss = (hex, alpha) =>
  alpha === undefined ? hex : `rgba(${rgb(hex).join(", ")}, ${alpha})`;

const luminance = (hex) => {
  const [r, g, b] = rgb(hex)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Readable label colour for text sitting on a solid swatch.
const onColor = (hex, alpha) => (alpha !== undefined && alpha < 0.5) || luminance(hex) > 0.4 ? "text-slate-800" : "text-white";

const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = (value) =>
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  return [copied, copy];
};

// Checkerboard under translucent swatches so the opacity is visible.
const CHECKER = {
  backgroundImage:
    "linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%)",
  backgroundSize: "12px 12px",
  backgroundPosition: "0 0,0 6px,6px -6px,-6px 0",
};

const formatHex = (hex, alpha) => (alpha === undefined ? hex : `${hex} · ${Math.round(alpha * 100)}%`);

// ── Contrast badge ──────────────────────────────────────────────────────────

/** WCAG 2.1 rating of `fg` on `bg` for normal-size text. */
export const ContrastBadge = ({ fg, bg = "#FFFFFF" }) => {
  const ratio = contrastRatio(fg, bg);
  const [label, cls] =
    ratio >= 7   ? ["AAA", "bg-green/10 text-green"] :
    ratio >= 4.5 ? ["AA", "bg-green/10 text-green"] :
    ratio >= 3   ? ["AA Large", "bg-amber-50 text-amber-600"] :
                   ["Fail", "bg-red-100 text-red-700"];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`} dir="ltr">
      {ratio.toFixed(1)}:1 · {label}
    </span>
  );
};

// ── Proposed tag ────────────────────────────────────────────────────────────

export const ProposedTag = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <span className={`rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 shadow-sm ring-1 ring-amber-300 ${className}`}>
      {t("styleGuide.brand.proposed")}
    </span>
  );
};

// ── Colour card ─────────────────────────────────────────────────────────────

/**
 * Swatch + name + HEX + token. Click to copy the HEX.
 *
 * Props: name, hex, token (null → "no token yet"), alpha?, note?, children? (extra
 *        content, e.g. a badge), size – "md" (default) | "lg",
 *        proposed – role assignment awaiting approval (adds a tag + dashed border)
 */
export const ColorCard = ({ name, hex, token, alpha, note, size = "md", proposed = false, children }) => {
  const { t } = useTranslation();
  const [copied, copy] = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      title={t("styleGuide.brand.click_to_copy")}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white text-start transition-shadow hover:shadow-md ${
        proposed ? "border-dashed border-amber-300" : "border-slate-200"
      }`}
    >
      {proposed && <ProposedTag className="absolute end-2 top-2 z-10" />}
      <div className={`relative w-full ${size === "lg" ? "h-40" : "h-20"}`} style={alpha !== undefined ? CHECKER : undefined}>
        <div
          className={`absolute inset-0 ${hex.toUpperCase() === "#FFFFFF" || alpha !== undefined ? "border-b border-slate-100" : ""}`}
          style={{ backgroundColor: toCss(hex, alpha) }}
        />
        <span
          className={`absolute bottom-2 start-3 text-[10px] font-semibold opacity-0 transition-opacity group-hover:opacity-100 ${onColor(hex, alpha)}`}
        >
          {copied ? t("common.copied") : t("styleGuide.brand.click_to_copy")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="font-mono text-xs text-slate-600" dir="ltr">{formatHex(hex, alpha)}</p>
        {token ? (
          <code className="w-fit rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600" dir="ltr">
            {token}
          </code>
        ) : (
          <span className="w-fit rounded border border-dashed border-slate-300 px-1.5 py-0.5 text-[11px] text-slate-500">
            {t("styleGuide.brand.no_token")}
          </span>
        )}
        {note && <p className="mt-1 text-xs leading-relaxed text-slate-500">{note}</p>}
        {children}
      </div>
    </button>
  );
};

// ── Shade scale ─────────────────────────────────────────────────────────────

/** Horizontal 50–900 strip. Each cell shows shade, HEX and token on hover/focus. */
export const ScaleStrip = ({ name, prefix, shades, highlight }) => {
  const { t } = useTranslation();
  const [copiedHex, setCopiedHex] = useState(null);

  const copy = (hex) =>
    navigator.clipboard?.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1200);
    });

  return (
    <div>
      <p className="mb-2 flex flex-wrap items-baseline gap-2 text-sm font-semibold text-slate-900">
        {name}
        <code className="font-mono text-xs font-normal text-slate-400" dir="ltr">{prefix}-50 … {prefix}-900</code>
      </p>
      <div className="grid grid-cols-5 overflow-hidden rounded-2xl border border-slate-200 md:grid-cols-10">
        {Object.entries(shades).map(([shade, hex]) => (
          <button
            key={shade}
            type="button"
            onClick={() => copy(hex)}
            title={`${prefix}-${shade} · ${hex}`}
            className={`relative flex h-24 flex-col justify-end p-2 text-start transition-transform hover:z-10 hover:scale-105 ${onColor(hex)}`}
            style={{ backgroundColor: hex }}
          >
            {String(shade) === String(highlight) && (
              <span className="absolute end-2 top-2 rounded-full bg-navy-900 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brand-500">
                {t("styleGuide.brand.base")}
              </span>
            )}
            <span className="text-xs font-bold">{shade}</span>
            <span className="font-mono text-[10px] opacity-90" dir="ltr">{copiedHex === hex ? t("common.copied") : hex}</span>
            <span className="font-mono text-[9px] opacity-70" dir="ltr">{prefix}-{shade}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
