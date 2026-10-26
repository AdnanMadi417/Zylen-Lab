import React from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";
import WebsitePreview from "../WebsitePreview";

const WebsiteSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.website.${k}`);

  return (
    <GuideSection id="website" title={s("title")} intro={s("intro")}>
      <ComponentShowcase title={s("screen_name")} description={s("screen_desc")} canvas="muted">
        <WebsitePreview />
      </ComponentShowcase>
    </GuideSection>
  );
};

export default WebsiteSection;
