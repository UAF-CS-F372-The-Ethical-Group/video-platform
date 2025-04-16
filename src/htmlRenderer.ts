import { readFile } from "node:fs/promises";
import path from "node:path";
import { VNode } from "preact";
import { render } from "preact-render-to-string";
import Head from "./components/Head.tsx";

const template =
  (await readFile(path.join(import.meta.dirname!, "static/.layout.html")))
    .toString();

export function renderPage(page: VNode) {
  const body = render(page);
  const head = render(Head.rewind());
  return template.replace("<!-- SLOT-LAYOUT-HEAD -->", head).replace(
    "<!-- SLOT-LAYOUT-PAGE -->",
    body,
  );
}
