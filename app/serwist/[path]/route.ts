import { spawnSync } from "node:child_process";

import { createSerwistRoute } from "@serwist/turbopack";

const gitRevision =
  process.env.COMMIT_REF ||
  spawnSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf-8",
  }).stdout.trim() ||
  "local";

export const {
  dynamic,
  dynamicParams,
  revalidate,
  generateStaticParams,
  GET,
} = createSerwistRoute({
  additionalPrecacheEntries: [
    { url: "/~offline", revision: gitRevision },
    { url: "/calculadora", revision: gitRevision },
    { url: "/resumen", revision: gitRevision },
  ],
  swSrc: "app/sw.ts",
  useNativeEsbuild: true,
});
