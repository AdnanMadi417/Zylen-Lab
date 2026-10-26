import React, { useMemo, useState } from "react";
import { MdCheck, MdContentCopy, MdFileDownload } from "react-icons/md";
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

const CodePanel = ({ filename, code }) => {
  const t = useGuideT();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="overflow-hidden rounded-primary border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-slate-900" dir="ltr">{filename}</p>
        <div className="flex shrink-0 gap-2 print:hidden">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            {copied ? <MdCheck className="h-3.5 w-3.5" /> : <MdContentCopy className="h-3.5 w-3.5" />}
            {copied ? t("common.copied") : t("styleGuide.ui.copy")}
          </button>
          <button
            type="button"
            onClick={() => download(filename.split("/").pop(), code)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-on-brand hover:bg-brand-600"
          >
            <MdFileDownload className="h-3.5 w-3.5" /> {t("styleGuide.handoff.download")}
          </button>
        </div>
      </div>
      <pre className="max-h-96 overflow-auto bg-slate-900 p-5 text-xs leading-relaxed text-slate-100" dir="ltr">
        <code>{code}</code>
      </pre>
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
      <CodePanel filename="tailwind.config.js" code={config} />
      <CodePanel filename="src/index.css" code={css} />
    </GuideSection>
  );
};

export default HandoffSection;
