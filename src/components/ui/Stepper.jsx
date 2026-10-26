import React from "react";
import { MdCheck } from "react-icons/md";

/**
 * Stepper — progress through a multi-step flow.
 *
 * Props:
 *   steps   – { label, description? }[]
 *   current – index of the active step (earlier steps show as complete)
 */
const Stepper = ({ steps, current, className = "" }) => (
  <ol className={`flex w-full items-start ${className}`}>
    {steps.map((step, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <li key={i} className="relative flex flex-1 flex-col items-center text-center">
          {i > 0 && (
            <span
              className={`absolute top-4 h-0.5 w-[calc(100%-2.5rem)] ltr:right-[calc(50%+1.25rem)] rtl:left-[calc(50%+1.25rem)] ${
                done || active ? "bg-brand-500" : "bg-slate-200"
              }`}
            />
          )}
          <span
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
              done
                ? "bg-brand-500 text-on-brand"
                : active
                ? "bg-white text-brand-800 ring-2 ring-brand-500"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {done ? <MdCheck className="h-4 w-4" /> : i + 1}
          </span>
          <span className={`mt-2 text-sm font-semibold ${active || done ? "text-slate-900" : "text-slate-400"}`}>{step.label}</span>
          {step.description && <span className="mt-0.5 hidden text-xs text-slate-400 sm:block">{step.description}</span>}
        </li>
      );
    })}
  </ol>
);

export default Stepper;
