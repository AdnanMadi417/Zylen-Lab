import React from "react";
import { sectionNumber } from "../constants/sections";

/**
 * Top-level style guide section — anchor target for the table of contents.
 *
 * Props:
 *   id       – anchor id; must be listed in constants/sections.js
 *   eyebrow  – small label above the title (defaults to the section number, e.g. "01")
 *   title    – section title
 *   intro    – one or two sentences describing the section
 *   children – section content
 */
const GuideSection = ({ id, eyebrow = sectionNumber(id), title, intro, children }) => (
  <section id={id} className="scroll-mt-24 border-b border-slate-100 py-14 last:border-b-0">
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      {intro && <p className="mt-3 text-base leading-relaxed text-slate-500">{intro}</p>}
    </div>
    <div className="flex flex-col gap-8">{children}</div>
  </section>
);

export default GuideSection;
