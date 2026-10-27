import { useUiTemplate } from "../../hooks/useUiTemplate";
import KindergartenWebsite from "./kindergarten/KindergartenWebsite";
import KindergartenSignIn from "./kindergarten/KindergartenSignIn";
import KindergartenUserOverview from "./kindergarten/KindergartenUserOverview";

/**
 * Industry-specific designs a client opts into with `design: "<key>"` in its
 * config. `website` / `signin` replace the generic WebsitePreview / AuthPreview;
 * `pages` are extra website pages (shown in the Website section, the phone
 * frames and at /<slug>/preview/<page>), each titled by
 * styleGuide.website.page_<page>_name / _desc.
 */
export const DESIGNS = {
  kindergarten: {
    website: KindergartenWebsite,
    signin: KindergartenSignIn,
    pages: { overview: KindergartenUserOverview },
  },
};

/** The active client's design, or undefined for the generic screens. */
export const useDesign = () => DESIGNS[useUiTemplate().design];
