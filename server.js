import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import { render } from "./dist/server/entry-server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDirectory = path.resolve(__dirname, "dist");
const templatePath = path.join(clientDirectory, "index.html");
const port = process.env.PORT || 4173;

const app = express();

app.use(express.static(clientDirectory));

app.use(async (request, response, next) => {
  if (request.method !== "GET") {
    next();
    return;
  }

  try {
    const template = await fs.readFile(templatePath, "utf8");
    const { markup, helmet } = render(request.originalUrl);
    const head = [
      helmet?.title?.toString(),
      helmet?.meta?.toString(),
      helmet?.link?.toString(),
    ]
      .filter(Boolean)
      .join("\n");

    const html = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", markup);

    response.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`SSR frontend running on port ${port}`);
});