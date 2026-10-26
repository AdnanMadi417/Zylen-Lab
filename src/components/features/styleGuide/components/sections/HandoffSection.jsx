import React, { useMemo, useState } from "react";
import { MdCheck, MdContentCopy, MdDescription, MdFileDownload } from "react-icons/md";
import { useGuideT, useUiTemplate } from "../../hooks/useUiTemplate";
import { accentToken, buildIndexCss, buildTailwindConfig } from "../../utils/tailwindExport";
import GuideSection from "../GuideSection";

const download = (filename, text) => {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/** A generated file the developer downloads — the code itself isn't shown on the page. */
const FileCard = ({ filename, description, code }) => {
  const t = useGuideT();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-primary border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-800">
          <MdDescription className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold text-slate-900" dir="ltr">{filename}</p>
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 print:hidden">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
        >
          {copied ? <MdCheck className="h-3.5 w-3.5" /> : <MdContentCopy className="h-3.5 w-3.5" />}
          {copied ? t("common.copied") : t("styleGuide.ui.copy")}
        </button>
        <button
          type="button"
          onClick={() => download(filename.split("/").pop(), code)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-2 text-xs font-semibold text-on-brand hover:bg-brand-600"
        >
          <MdFileDownload className="h-3.5 w-3.5" /> {t("styleGuide.handoff.download")}
        </button>
      </div>
    </div>
  );
};

const HandoffSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.handoff.${k}`);
  const client = useUiTemplate();
  const config = useMemo(() => buildTailwindConfig(client), [client]);
  const css = useMemo(() => buildIndexCss(client), [client]);

  const tokens = [
    "brand-50 … brand-900",
    "ink",
    "on-brand",
    ...(client.colors.accents ?? []).map(accentToken),
    "font-dm",
    "font-display",
  ];

  return (
    <GuideSection id="handoff" title={s("title")} intro={s("intro")}>
      <div className="rounded-primary border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-900">{s("tokens_title")}</p>
        <p className="mt-1 text-sm text-slate-500">{s("tokens_intro")}</p>
        <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
          {tokens.map((token) => (
            <code key={token} className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs text-slate-700 ring-1 ring-slate-200">
              {token}
            </code>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <FileCard filename="tailwind.config.js" description={s("config_desc")} code={config} />
        <FileCard filename="src/index.css" description={s("css_desc")} code={css} />
      </div>
    </GuideSection>
  );
};

export default HandoffSection;
