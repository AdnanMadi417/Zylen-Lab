import React from "react";
import { MdCheck, MdClose, MdLightbulbOutline, MdWarningAmber } from "react-icons/md";
import GuideSection from "../GuideSection";
import ClientLogo from "../ClientLogo";
import { ColorCard, ScaleStrip, ContrastBadge, ProposedTag, toCss, contrastRatio } from "../ColorSwatch";
import { getBrandColors, SEMANTIC } from "../../constants/colors";
import { useGuideT, useUiTemplate } from "../../hooks/useUiTemplate";

const Group = ({ title, intro, children }) => (
  <div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    {intro && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">{intro}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const BrandIdentitySection = () => {
  const t = useGuideT();
  const client = useUiTemplate();
  const { PRIMARY, INK, SCALES, SECONDARY_ACCENT, SURFACES, TEXT, BORDERS } = getBrandColors(client.colors);
  const PROPOSALS = client.proposals;
  const s = (k, o) => t(`styleGuide.brand.${k}`, o);

  return (
    <GuideSection id="brand" title={s("title")} intro={s("intro")}>
      {/* ── Primary brand colour ── */}
      <div className="grid overflow-hidden rounded-primary border border-slate-200 lg:grid-cols-5">
        <div className="relative flex min-h-[260px] flex-col justify-between p-8 lg:col-span-3" style={{ backgroundColor: PRIMARY.hex }}>
          <span className="w-fit rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-500">
            {s("primary_badge")}
          </span>
          <div className="text-ink">
            <p className="text-4xl font-bold">{s(`names.${PRIMARY.nameKey}`)}</p>
            <p className="mt-2 font-mono text-lg" dir="ltr">{PRIMARY.hex}</p>
            <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
              <code className="rounded bg-ink/10 px-2 py-0.5 font-mono text-xs">{PRIMARY.token}</code>
              {PRIMARY.aliases.map((a) => (
                <code key={a} className="rounded bg-ink/10 px-2 py-0.5 font-mono text-xs">{a}</code>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 bg-white p-8 lg:col-span-2">
          <div className="flex items-center gap-4">
            <ClientLogo className="h-24 w-24 shrink-0 rounded-xl text-3xl" />
            <p className="text-sm leading-relaxed text-slate-500">{s("primary_desc")}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {[
              { fg: INK.hex, key: "pair_black" },
              { fg: SCALES.navy.shades[700], key: "pair_navy" },
              { fg: "#FFFFFF", key: "pair_white" },
            ].map((p) => ({ ...p, ok: contrastRatio(p.fg, PRIMARY.hex) >= 4.5 })).map((p) => (
              <div key={p.key} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-slate-700">
                  {p.ok ? <MdCheck className="h-4 w-4 text-slate-900" /> : <MdClose className="h-4 w-4 text-slate-400" />}
                  {s(p.key)}
                </span>
                <ContrastBadge fg={p.fg} bg={PRIMARY.hex} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Primary palette ── */}
      <Group title={s("palette_title")} intro={s("palette_intro")}>
        <ScaleStrip name={s(`names.${SCALES.brand.nameKey}`)} {...SCALES.brand} highlight={500} />
      </Group>

      {/* ── Secondary & accent ── */}
      <Group title={s("secondary_title")} intro={s("secondary_intro")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECONDARY_ACCENT.map((c) => (
            <ColorCard
              key={c.nameKey}
              name={s(`names.${c.nameKey}`)}
              hex={c.hex}
              token={c.token}
              note={s(c.roleKey)}
              proposed={c.proposed}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-5">
          {["navy", "slate"].map((k) => (
            <ScaleStrip key={k} name={s(`names.${SCALES[k].nameKey}`)} {...SCALES[k]} />
          ))}
        </div>
      </Group>

      {/* ── Background & surface ── */}
      <Group title={s("surface_title")} intro={s("surface_intro")}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SURFACES.map((c) => (
            <ColorCard key={c.token} name={s(c.nameKey)} hex={c.hex} token={`bg-${c.token}`} alpha={c.alpha} proposed={c.proposed} />
          ))}
        </div>
      </Group>

      {/* ── Text ── */}
      <Group title={s("text_title")} intro={s("text_intro")}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TEXT.map((c) => (
            <ColorCard
              key={c.nameKey}
              name={s(c.nameKey)}
              hex={c.hex}
              alpha={c.alpha}
              token={c.token.startsWith("disabled") ? c.token : `text-${c.token}`}
              note={c.noteKey ? s(c.noteKey) : undefined}
              proposed={c.proposed}
            >
              <div className={`mt-2 rounded-lg px-2.5 py-2 ${c.dark ? "bg-navy-700" : "bg-white ring-1 ring-slate-100"}`}>
                <p className="text-sm font-medium" style={{ color: toCss(c.hex, c.alpha) }}>{s("text_sample")}</p>
              </div>
              {!c.alpha && (
                <div className="mt-2">
                  <ContrastBadge fg={c.hex} bg={c.dark ? "#1B254B" : "#FFFFFF"} />
                </div>
              )}
            </ColorCard>
          ))}
        </div>
      </Group>

      {/* ── Semantic ── */}
      <Group title={s("semantic_title")} intro={s("semantic_intro")}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SEMANTIC.map((c) => (
            <div key={c.key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex h-20 items-end p-3.5" style={{ backgroundColor: c.base.hex }}>
                <span className="text-sm font-bold text-white">{s(`semantic.${c.key}`)}</span>
              </div>
              {/* Live preview using the exact bg / border / text tokens */}
              <div className="p-3.5">
                <div
                  className="rounded-xl border px-3 py-2.5 text-sm font-medium"
                  style={{
                    backgroundColor: toCss(c.bg.hex, c.bg.alpha),
                    borderColor: toCss(c.border.hex, c.border.alpha),
                    color: c.text.hex,
                  }}
                >
                  {s(`semantic_sample.${c.key}`)}
                </div>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs" dir="ltr">
                  {["base", "bg", "border", "text"].map((part) => (
                    <React.Fragment key={part}>
                      <dt className="flex items-center gap-1.5 text-slate-400">
                        <span
                          className="h-3 w-3 rounded-sm ring-1 ring-slate-200"
                          style={{ backgroundColor: toCss(c[part].hex, c[part].alpha) }}
                        />
                        {part}
                      </dt>
                      <dd className="font-mono text-slate-600">
                        {c[part].token} · {c[part].hex}{c[part].alpha !== undefined ? ` · ${Math.round(c[part].alpha * 100)}%` : ""}
                      </dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </Group>

      {/* ── Borders ── */}
      <Group title={s("border_title")} intro={s("border_intro")}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BORDERS.map((c) => (
            <div
              key={c.token}
              className={`relative rounded-2xl border bg-white p-3.5 ${c.proposed ? "border-dashed border-amber-300" : "border-slate-200"}`}
            >
              {c.proposed && <ProposedTag className="absolute end-2 top-2 z-10" />}
              <div className="flex h-16 items-center justify-center rounded-xl border-2 bg-slate-50" style={{ borderColor: c.hex }}>
                <span className="text-xs font-medium text-slate-400">{s("border_sample")}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{s(c.nameKey)}</p>
              <p className="font-mono text-xs text-slate-600" dir="ltr">{c.hex}</p>
              <code className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600" dir="ltr">
                border-{c.token}
              </code>
            </div>
          ))}
        </div>
      </Group>

      {/* ── Audit notes & proposals (not applied) ── */}
      {PROPOSALS.length > 0 && (
      <div className="rounded-primary border border-amber-200 bg-amber-50/60 p-6 print:break-inside-avoid">
        <div className="flex items-start gap-3">
          <MdLightbulbOutline className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">{s("proposals_title")}</h3>
            <p className="mt-1 text-sm text-slate-600">{s("proposals_intro")}</p>
          </div>
        </div>
        <ul className="mt-5 flex flex-col gap-3">
          {PROPOSALS.map((p) => (
            <li key={p.key} className="flex flex-col gap-3 rounded-xl bg-white p-4 ring-1 ring-amber-100 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 items-start gap-2.5">
                <MdWarningAmber className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm leading-relaxed text-slate-700">{s(`proposals.${p.key}`)}</p>
              </div>
              {(p.current.length > 0 || p.proposed.length > 0) && (
                <div className="flex shrink-0 items-center gap-2" dir="ltr">
                  {p.current.map((hex) => (
                    <span key={hex} className="flex items-center gap-1 rounded-full bg-slate-100 py-0.5 pe-2 ps-0.5 font-mono text-[10px] text-slate-500">
                      <span className="h-4 w-4 rounded-full ring-1 ring-slate-200" style={{ backgroundColor: hex.length > 7 ? toCss(hex.slice(0, 7), 0.1) : hex }} />
                      {hex}
                    </span>
                  ))}
                  {p.current.length > 0 && p.proposed.length > 0 && <span className="text-slate-300">→</span>}
                  {p.proposed.map((x) => (
                    <span key={x.token} className="flex items-center gap-1 rounded-full bg-brand-100 py-0.5 pe-2 ps-0.5 font-mono text-[10px] font-semibold text-brand-800">
                      <span className="h-4 w-4 rounded-full ring-1 ring-white" style={{ backgroundColor: x.hex }} />
                      {x.token}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      )}
    </GuideSection>
  );
};

export default BrandIdentitySection;
