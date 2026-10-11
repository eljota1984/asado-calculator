import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

process.env.NODE_ENV = "production";

const { createSerwistRoute } = await import("@serwist/turbopack");

const revision =
  process.env.COMMIT_REF ||
  process.env.DEPLOY_ID ||
  spawnSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf-8",
  }).stdout.trim() ||
  "local-build";

const { generateStaticParams, GET } = createSerwistRoute({
  additionalPrecacheEntries: [
    { url: "/~offline", revision },
    { url: "/calculadora", revision },
    { url: "/resumen", revision },
  ],
  swSrc: "app/sw.ts",
  useNativeEsbuild: true,
});

const outDir = path.join(process.cwd(), "public", "serwist");
await mkdir(outDir, { recursive: true });

const params = await generateStaticParams();

for (const { path: filePath } of params) {
  const response = await GET(undefined, {
    params: { path: filePath },
  });

  if (!response.ok) {
    throw new Error(
      `No se pudo generar ${filePath}: ${response.status} ${response.statusText}`,
    );
  }

  const destination = path.join(outDir, filePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, await response.text(), "utf-8");

  console.log(`Service worker generado: public/serwist/${filePath}`);
}