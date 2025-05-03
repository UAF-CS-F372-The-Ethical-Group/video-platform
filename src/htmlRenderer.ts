/**
 *  Contains utilities used to render a page to HTML
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { VNode } from "preact";
import { render } from "preact-render-to-string";
import Head from "./components/Head.tsx";

// Read in the global template
const template = (await readFile(
  path.join(import.meta.dirname!, "static/.layout.html"),
))
  .toString();

/**
 * Given a VNode, render it to a string and inject into the layout template
 */
export function renderPage(page: VNode): string {
  const body = render(page);
  const head = render(Head.rewind());
  return template.replace("<!-- SLOT-LAYOUT-HEAD -->", head).replace(
    "<!-- SLOT-LAYOUT-PAGE -->",
    body,
  );
}
