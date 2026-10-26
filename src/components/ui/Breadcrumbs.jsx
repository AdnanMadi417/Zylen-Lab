import React from "react";
import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

/**
 * Breadcrumbs — where the current page sits in the hierarchy.
 *
 * Props:
 *   items – { label, to? }[]; the last item is the current page
 */
const Breadcrumbs = ({ items, className = "" }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={i} className="flex items-center gap-1.5">
            {last || !item.to ? (
              <span className={last ? "font-semibold text-slate-900" : "text-slate-400"} aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="text-slate-400 transition-colors hover:text-brand-800">
                {item.label}
              </Link>
            )}
            {!last && <MdChevronRight className="h-4 w-4 text-slate-300 rtl:rotate-180" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
