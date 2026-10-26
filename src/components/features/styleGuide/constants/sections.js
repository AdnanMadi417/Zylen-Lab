// Section order for the style guide. Drives the table of contents and the
// "01", "02"… numbering, so reordering here renumbers everything.
export const SECTION_IDS = [
  "brand",
  "typography",
  "foundations",
  "buttons",
  "forms",
  "feedback",
  "popups",
  "data",
  "website",
  "dashboard",
  "handoff",
];

export const sectionNumber = (id) => String(SECTION_IDS.indexOf(id) + 1).padStart(2, "0");
