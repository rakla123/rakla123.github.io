import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import worker from "../dist/server/index.js";

const port = Number(process.env.PORT || 4173);
const clientRoot = resolve("dist/client");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

async function staticResponse(pathname) {
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  let filePath = resolve(clientRoot, relativePath || "index.html");
  if (pathname.endsWith("/")) filePath = resolve(filePath, "index.html");
  if (filePath !== clientRoot && !filePath.startsWith(`${clientRoot}${sep}`)) return null;

  try {
    const details = await stat(filePath);
    if (!details.isFile()) return null;
    return new Response(await readFile(filePath), {
      headers: {
        "content-type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-cache",
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const request = new Request(`http://localhost:${port}${req.url}`, { method: req.method });
  let response = await worker.fetch(request, {});
  if (response.status === 404) {
    response = (await staticResponse(new URL(request.url).pathname)) || response;
  }
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
});

server.listen(port, "127.0.0.1", () => console.log(`FlapAstro preview: http://127.0.0.1:${port}`));
