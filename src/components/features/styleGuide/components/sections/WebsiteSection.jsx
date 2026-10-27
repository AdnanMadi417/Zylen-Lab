import React from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";
import WebsitePreview from "../WebsitePreview";
import { useDesign } from "../designs";

const WebsiteSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.website.${k}`);
  const pages = Object.entries(useDesign()?.pages ?? {});

  return (
    <GuideSection id="website" title={s("title")} intro={s("intro")}>
      <ComponentShowcase title={s("screen_name")} description={s("screen_desc")} canvas="muted">
        <WebsitePreview />
      </ComponentShowcase>

      {pages.map(([id, Page]) => (
        <ComponentShowcase key={id} title={s(`page_${id}_name`)} description={s(`page_${id}_desc`)} canvas="muted">
          <Page />
        </ComponentShowcase>
      ))}
    </GuideSection>
  );
};

export default WebsiteSection;
