import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function request(path) {
  return worker.fetch(new Request(`https://flapastro.com${path}`), {});
}

test("renders the home page without a personal name", async () => {
  const response = await request("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.match(html, /FlapAstro — Deep-sky imaging/);
  assert.match(html, /cdn\.astrobin\.com/);
  assert.match(html, /href="\/gallery\/"/);
  assert.match(html, /© FlapAstro/);
  assert.match(html, /instagram\.com\/flapastro/);
  assert.match(html, /Instagram · @FlapAstro/);
  assert.match(html, /footer-social-icon--astrobin/);
  assert.match(html, /footer-social-icon--instagram/);
  assert.match(html, /footer-social-icon--github/);
  assert.match(html, /aria-label="FlapAstro on AstroBin/);
  assert.match(html, /aria-label="FlapAstro on Instagram/);
  assert.match(html, /aria-label="FlapAstro projects on GitHub/);
  assert.doesNotMatch(html, /Ralf|Klappert/i);
});

test("serves separate section pages", async () => {
  const [gallery, about, equipment, allsky, software] = await Promise.all([
    request("/gallery/").then((response) => response.text()),
    request("/about/").then((response) => response.text()),
    request("/equipment/").then((response) => response.text()),
    request("/allsky/").then((response) => response.text()),
    request("/software/").then((response) => response.text()),
  ]);

  assert.match(gallery, /data-catalogue="messier"/);
  assert.match(gallery, /data-catalogue="ngc"/);
  assert.match(gallery, /data-catalogue="ic"/);
  assert.match(gallery, /data-subject="deep-sky"/);
  assert.match(gallery, /Sharpless · SH2/);
  assert.match(gallery, /Planetary/);
  assert.match(gallery, /Solar/);
  assert.match(about, /From film/);
  assert.match(equipment, /Sky-Watcher Equinox 120/);
  assert.match(equipment, /0\.85× reducer/);
  assert.match(equipment, /FTF focuser/);
  assert.match(equipment, /QHYCCD QHY268M/);
  assert.match(equipment, /QHY OAG/);
  assert.match(equipment, /QHY filter wheel/);
  assert.match(equipment, /Antlia LRGB · Ha · OIII · SII/);
  assert.match(equipment, /William Optics RedCat 51 II/);
  assert.match(equipment, /DeepSkyDad AF/);
  assert.match(equipment, /QHYCCD QHY268C/);
  assert.match(equipment, /Sky-Watcher AZ-EQ6 GT/);
  assert.match(allsky, /All-Sky Camera/);
  assert.match(allsky, /ZWO ASI224MC/);
  assert.match(allsky, /Intel NUC/);
  assert.match(allsky, /AllSky software/);
  assert.match(allsky, /temperature and relative humidity/i);
  assert.match(allsky, /calculates the current dew point/i);
  assert.match(allsky, /Arduino varies the heater’s power output/i);
  assert.match(allsky, /github\.com\/rakla123\/arduino-serial-monitor/);
  assert.match(allsky, /Adafruit SHT31 Library/);
  assert.match(allsky, /ATmega328P \(Old Bootloader\)/);
  assert.match(allsky, /ArduinoSerialMonitor\.exe/);
  assert.match(allsky, /Never power a heater directly from an Arduino pin/);
  assert.match(software, /AstroBin Sky Mapper/);
  assert.match(software, /Interactive celestial projection/);
  assert.match(software, /Start-AstroBinSky\.bat/);
  assert.match(software, /Node\.js 18 or newer/);
  assert.match(software, /127\.0\.0\.1:8787/);
  assert.match(software, /github\.com\/rakla123\/astrobin-sky-mapper/);
  assert.match(software, /ASTAP and a suitable star database are optional/);
  assert.match(software, /RC-Astro CLI Wrapper/);

  for (const html of [gallery, about, equipment, allsky, software]) {
    assert.doesNotMatch(html, /Ralf|Klappert/i);
  }
});

test("serves CSS and JavaScript with correct types", async () => {
  const css = await request("/styles.css");
  const js = await request("/app.js");
  assert.match(css.headers.get("content-type"), /^text\/css/);
  assert.match(js.headers.get("content-type"), /^text\/javascript/);
});

test("includes responsive breakpoints and robust mobile navigation", async () => {
  const [css, js] = await Promise.all([
    request("/styles.css").then((response) => response.text()),
    request("/app.js").then((response) => response.text()),
  ]);
  assert.match(css, /@media \(max-width: 1100px\)/);
  assert.match(css, /@media \(max-width: 860px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /object-fit: contain/);
  assert.match(css, /\.home-page \.site-header/);
  assert.match(css, /\.inner-page \.mobile-nav/);
  assert.match(js, /closeMobileNavigation/);
  assert.match(js, /event\.key === "Escape"/);
  assert.match(js, /min-width: 861px/);
});

test("returns a real 404 for missing assets", async () => {
  const response = await request("/missing.png");
  assert.equal(response.status, 404);
});

test("returns a real 404 for missing pages", async () => {
  const response = await request("/missing/");
  assert.equal(response.status, 404);
});
