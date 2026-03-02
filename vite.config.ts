import { defineConfig } from "vite";
import type { Plugin } from "vite";
import { promises as fs } from "node:fs";
import type { IncomingMessage } from "node:http";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const PROMPTS_FILE_PATH = path.resolve(process.cwd(), "prompts.json");

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += String(chunk);
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function promptsJsonApiPlugin(): Plugin {
  return {
    name: "prompts-json-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/prompts")) {
          next();
          return;
        }

        if (req.method === "GET") {
          try {
            const fileContent = await fs.readFile(PROMPTS_FILE_PATH, "utf-8");
            const parsedContent: unknown = JSON.parse(fileContent);
            const payload = Array.isArray(parsedContent) ? parsedContent : [];

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(payload));
          } catch (error) {
            const fileError = error as NodeJS.ErrnoException;
            if (fileError.code === "ENOENT") {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              res.end("[]");
              return;
            }

            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "Falha ao ler prompts.json" }));
          }
          return;
        }

        if (req.method === "POST") {
          try {
            const rawBody = await readRequestBody(req);
            const parsedBody: unknown = rawBody ? JSON.parse(rawBody) : [];

            if (!Array.isArray(parsedBody)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              res.end(JSON.stringify({ error: "Payload invalido" }));
              return;
            }

            await fs.writeFile(
              PROMPTS_FILE_PATH,
              JSON.stringify(parsedBody, null, 2),
              "utf-8"
            );

            res.statusCode = 204;
            res.end();
          } catch (_error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "Falha ao salvar prompts.json" }));
          }
          return;
        }

        res.statusCode = 405;
        res.setHeader("Allow", "GET, POST");
        res.end("Method Not Allowed");
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    promptsJsonApiPlugin(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
  ],
});
