import { describe, expect, it } from "vitest";
import config from "./obtainium.json";
import { obtainiumImportUrl } from "./obtainium";
import { site } from "./site";

describe("Obtainium import", () => {
  it("preserves the Android identity and nested APK filter in the redirect payload", () => {
    const encoded = obtainiumImportUrl.split("obtainium://app/")[1];
    if (!encoded) throw new Error("Missing Obtainium app payload");
    const app = JSON.parse(decodeURIComponent(encoded));
    expect(app).toEqual(config.apps[0]);
    expect(app.id).toBe("io.github.waywhywhy.waydlp");
    expect(app.url).toBe(`https://github.com/${site.repos.mobile}`);
    const settings = JSON.parse(app.additionalSettings);
    expect(settings.includePrereleases).toBe(false);
    const filter = new RegExp(settings.apkFilterRegEx);
    expect(filter.test("waydlp-0.1.0-android-universal.apk")).toBe(true);
    expect(filter.test("waydlp-0.1.0-android-universal.aab")).toBe(false);
    expect(filter.test("waydlp-0.1.0-android-arm64.apk")).toBe(false);
  });
});
