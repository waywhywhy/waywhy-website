import config from "./obtainium.json";

/** HTTPS fallback also helps visitors who have not installed Obtainium yet. */
export const obtainiumImportUrl =
  "https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/" +
  encodeURIComponent(JSON.stringify(config.apps[0]));
