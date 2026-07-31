import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../site/pages.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const site = resolve(root, "site");
const publicDir = resolve(root, "public");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await cp(publicDir, client, { recursive: true });

const [css, js] = await Promise.all([
  readFile(resolve(site, "styles.css"), "utf8"),
  readFile(resolve(site, "app.js"), "utf8"),
]);

await Promise.all([
  writeFile(resolve(client, "styles.css"), css),
  writeFile(resolve(client, "app.js"), js),
  ...pages.map(async (page) => {
    const output = resolve(client, page.output);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, page.html);
  }),
]);

const pageFiles = Object.fromEntries(
  pages.flatMap((page) => [
    [page.path, page.html],
    [page.path === "/" ? "/index.html" : page.path.slice(0, -1), page.html],
    ...(page.path === "/" ? [] : [[`${page.path}index.html`, page.html]]),
  ]),
);
const files = { ...pageFiles, "/styles.css": css, "/app.js": js };
const types = Object.fromEntries(
  Object.keys(files).map((path) => [
    path,
    path === "/styles.css"
      ? "text/css; charset=utf-8"
      : path === "/app.js"
        ? "text/javascript; charset=utf-8"
        : "text/html; charset=utf-8",
  ]),
);

const worker = `const files = ${JSON.stringify(files)};
const types = ${JSON.stringify(types)};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (Object.prototype.hasOwnProperty.call(files, url.pathname)) {
      return new Response(files[url.pathname], {
        headers: {
          "content-type": types[url.pathname],
          "cache-control": "no-cache",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin"
        }
      });
    }
    if (env?.ASSETS) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    }
    return new Response("Not found", { status: 404 });
  }
};
`;

await writeFile(resolve(server, "index.js"), worker);
console.log("Built FlapAstro site in dist/");
