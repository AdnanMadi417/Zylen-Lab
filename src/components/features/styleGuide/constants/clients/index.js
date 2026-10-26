// Registry of client UI templates. Each one is served at /<slug>
// (ui-template-<client>-<year>). To add a client: copy unidexs.js, fill it in,
// list it here, and add any copy overrides under uiTemplates.<id> in the locales.
import haluan from "./haluan";
import unidexs from "./unidexs";

export const CLIENTS = [haluan, unidexs];
