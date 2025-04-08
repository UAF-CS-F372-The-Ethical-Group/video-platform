import { VNode } from "preact";
import { render } from "preact-render-to-string";
import Layout from "./components/Layout.tsx";

export default function renderHtml(vnodes: VNode) {
  return "<!DOCTYPE html>" + render(Layout({ children: vnodes }));
}
