import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGuideT } from "../../hooks/useUiTemplate";
import { useDesign } from "../designs";
import GuideSection from "../GuideSection";

// Phone viewport (iPhone 14-ish) and the scale it's drawn at on the page.
const PHONE = { width: 390, height: 800, scale: 0.62 };

/**
 * A screen in a phone frame. The screen runs in an iframe with a phone-sized
 * viewport, so Tailwind's responsive classes render the real mobile layout.
 */
const PhoneFrame = ({ screen, title }) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="rounded-[2.75rem] bg-slate-900 p-2.5 shadow-xl">
        <div
          className="overflow-hidden rounded-[2.2rem] bg-white"
          style={{ width: PHONE.width * PHONE.scale, height: PHONE.height * PHONE.scale }}
          dir="ltr"
        >
          <iframe
            key={i18n.language}
            src={`${pathname}/preview/${screen}`}
            title={title}
            loading="lazy"
            style={{
              width: PHONE.width,
              height: PHONE.height,
              border: 0,
              transform: `scale(${PHONE.scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      </div>
      <figcaption className="text-sm font-semibold text-slate-700">{title}</figcaption>
    </figure>
  );
};

const MobileSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.mobile.${k}`);
  // The design's extra website pages sit right after the homepage.
  const screens = ["website", ...Object.keys(useDesign()?.pages ?? {}), "dashboard", "signin"];

  return (
    <GuideSection id="mobile" title={s("title")} intro={s("intro")}>
      <div className="flex flex-wrap justify-center gap-8 rounded-primary border border-slate-200 bg-slate-50 px-6 py-10">
        {screens.map((screen) => (
          <PhoneFrame key={screen} screen={screen} title={s(`screen_${screen}`)} />
        ))}
      </div>
    </GuideSection>
  );
};

export default MobileSection;
