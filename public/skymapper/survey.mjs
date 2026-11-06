// Registered mirrors of the same CDS DSS2 colour HiPS, not different surveys.
// https://alasky.cds.unistra.fr/MocServer/query?ID=CDS%2FP%2FDSS2%2Fcolor&get=record
export const DSS_MIRRORS = [
  "https://casda.csiro.au/hips/DSS2/color",
  "https://stpubdata.s3.us-east-1.amazonaws.com/mast/skybackgrounds/DSSColor",
  "https://alasky.cds.unistra.fr/DSS/DSSColor",
  "https://alaskybis.cds.unistra.fr/DSS/DSSColor"
];

export const BACKGROUND_SURVEYS = [
  { id: "P/DSS2/color", name: "DSS — optical colour", order: 9, frame: "equatorial", mirrors: DSS_MIRRORS },
  { id: "P/2MASS/color", name: "2MASS — near infrared", order: 9, frame: "equatorial", mirrors: ["https://casda.csiro.au/hips/2MASS/Color", "https://irsa.ipac.caltech.edu/data/hips/CDS/2MASS/Color", "https://alaskybis.cds.unistra.fr/2MASS/Color"] },
  { id: "P/allWISE/color", name: "AllWISE — infrared", order: 8, frame: "equatorial", mirrors: ["https://irsa.ipac.caltech.edu/data/hips/CDS/AllWISE/RGB-W4-W2-W1", "https://alaskybis.cds.unistra.fr/AllWISE/RGB-W4-W2-W1"] },
  { id: "P/Mellinger/color", name: "Mellinger — Milky Way panorama", order: 4, frame: "galactic", mirrors: ["https://alasky.cds.unistra.fr/MellingerRGB"] }
];

export async function resolveSurveyUrl(survey = "P/DSS2/color", {
  fetchImpl = fetch, mirrors, timeoutMs = 5000
} = {}) {
  const normalized = survey.replace(/\/$/, "");
  const definition = BACKGROUND_SURVEYS.find(item => [item.id, `CDS/${item.id}`, ...item.mirrors].includes(normalized));
  if (!definition) return survey;
  mirrors ||= definition.mirrors;
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
          if (Number(text.match(/^hips_order\s*=\s*(\d+)/m)?.[1]) !== definition.order || text.match(/^hips_frame\s*=\s*(\w+)/m)?.[1] !== definition.frame) throw new Error("Invalid survey metadata");
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
