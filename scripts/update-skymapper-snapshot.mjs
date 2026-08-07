import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(root, "public", "skymapper", "data");
const server = process.env.SKY_MAPPER_SERVER || "http://127.0.0.1:8787";

async function readJson(path) {
  const response = await fetch(`${server}${path}`);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response.json();
}

const [payload, localConfig] = await Promise.all([
  readJson("/api/images"),
  readJson("/api/config"),
]);

const images = (payload.images || []).map((image) => ({
  id: image.id,
  title: image.title,
  published: image.published,
  subjects: image.subjects,
  ra: image.ra,
  dec: image.dec,
  thumb: image.thumb,
  preview: image.preview,
  pageUrl: image.pageUrl,
  footprint: image.footprint,
  equipment: image.equipment,
  preciseFootprint: image.preciseFootprint,
  geometrySource: image.geometrySource,
}));

const snapshot = {
  observer: { lat: 0, lon: 0, elev: 0 },
  username: "FlapAstro",
  library: "Hosted showcase",
  fetchedAt: payload.fetchedAt,
  snapshotCreatedAt: new Date().toISOString(),
  total: images.length,
  resolved: images.length,
  images,
};

const config = {
  applicationId: "flapastro-hosted-sky-mapper",
  version: localConfig.version || "1.2.0-beta.6",
  appName: "AstroBin Sky Mapper — FlapAstro",
  display: localConfig.display || {},
  username: "FlapAstro",
  library: "Hosted showcase",
};

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, "images.json"), `${JSON.stringify(snapshot)}\n`),
  writeFile(resolve(outputDirectory, "config.json"), `${JSON.stringify(config)}\n`),
]);

console.log(`Wrote ${images.length} public Sky Mapper entries from ${server}.`);
