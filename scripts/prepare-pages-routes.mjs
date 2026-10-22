import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/public");
const appSource = await readFile("client/src/App.tsx", "utf8");
const shellFile = path.join(outputDirectory, "index.html");
const routes = new Set();

for (const [, route] of appSource.matchAll(/<Route\s+path="([^"]+)"/g)) {
  // Wildcard routes still have a useful static entry point at their base path.
  const baseRoute = route.replace(/\/\*.*$/, "");
  if (!baseRoute || baseRoute.includes(":")) continue;
  routes.add(baseRoute);
}

// News detail URLs are data-driven. Generate entry points for the seeded posts;
// newly created posts still render through the 404 SPA fallback.
const storeSource = await readFile("client/src/stores/adminStore.ts", "utf8");
const newsStart = storeSource.indexOf("  news: [");
const newsEnd = storeSource.indexOf("\n  ],", newsStart);
if (newsStart < 0 || newsEnd < 0) {
  throw new Error("Could not locate the seeded news posts in adminStore.ts");
}

const newsSource = storeSource.slice(newsStart, newsEnd);
for (const [, id] of newsSource.matchAll(/\bid:\s*"([^"]+)"/g)) {
  routes.add(`/news/${id}`);
}

for (const route of routes) {
  const segments = route.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error(`Unsafe route path found: ${route}`);
  }

  const routeDirectory = path.join(outputDirectory, ...segments);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(shellFile, path.join(routeDirectory, "index.html"));
}

// Keep a client-rendered fallback for unknown paths and data added after build.
await copyFile(shellFile, path.join(outputDirectory, "404.html"));
console.log(`Prepared ${routes.size} static route entries and the SPA fallback.`);
