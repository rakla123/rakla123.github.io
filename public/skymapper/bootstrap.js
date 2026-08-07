import A from "./vendor/aladin/aladin.js";

const nativeFetch = window.fetch.bind(window);
window.__SKY_MAPPER_HOSTED__ = true;
window.fetch = (resource, options) => {
  const url = typeof resource === "string" ? resource : resource?.url;
  if (url === "/api/images") return nativeFetch("./data/images.json", options);
  if (url === "/api/config") return nativeFetch("./data/config.json", options);
  return nativeFetch(resource, options);
};

window.A = A;
await import("./app.js");
