// Registered mirrors of the same CDS DSS2 colour HiPS, not different surveys.
// https://alasky.cds.unistra.fr/MocServer/query?ID=CDS%2FP%2FDSS2%2Fcolor&get=record
export const DSS_MIRRORS = [
  "https://casda.csiro.au/hips/DSS2/color",
  "https://stpubdata.s3.us-east-1.amazonaws.com/mast/skybackgrounds/DSSColor",
  "https://alasky.cds.unistra.fr/DSS/DSSColor",
  "https://alaskybis.cds.unistra.fr/DSS/DSSColor"
];

export async function resolveSurveyUrl(survey = "P/DSS2/color", {
  fetchImpl = fetch, mirrors = DSS_MIRRORS, timeoutMs = 5000
} = {}) {
  const normalized = survey.replace(/\/$/, "");
  if (!["P/DSS2/color", "CDS/P/DSS2/color", ...DSS_MIRRORS].includes(normalized)) return survey;
  for (const base of mirrors) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      // Check both metadata and an actual tile with browser CORS rules. A server
      // returning a successful HTML error page must not count as a working HiPS.
      await Promise.all([
        (async () => {
          const response = await fetchImpl(`${base}/properties`, { signal: controller.signal, mode: "cors", credentials: "omit" });
          if (!response.ok) throw new Error("Survey metadata unavailable");
          const text = await response.text();
          if (!/^hips_order\s*=\s*9\s*$/m.test(text) || !/^hips_frame\s*=\s*equatorial\s*$/m.test(text)) throw new Error("Invalid DSS survey metadata");
        })(),
        (async () => {
          const response = await fetchImpl(`${base}/Norder3/Dir0/Npix0.jpg`, { signal: controller.signal, mode: "cors", credentials: "omit" });
          if (!response.ok) throw new Error("Survey tiles unavailable");
          const bytes = new Uint8Array(await response.arrayBuffer());
          if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error("Invalid survey tile");
        })()
      ]);
      return base;
    } catch {
      // Try another registered host without changing the selected sky survey.
    } finally {
      clearTimeout(timer);
      controller.abort();
    }
  }
  throw new Error("Sky background unavailable: survey servers could not be reached. Reload to retry; your image footprints remain available.");
}
