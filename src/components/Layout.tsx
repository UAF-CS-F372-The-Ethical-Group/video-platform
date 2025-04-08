import Head from "./Head.tsx";
import { VNode } from "preact";
import { render } from "preact-render-to-string";

export default function Layout(
  {
    children,
  }: {
    children: VNode;
  },
) {
  const renderedBody = render(children);
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        />

        {Head.rewind()}
      </head>
      <body dangerouslySetInnerHTML={{ __html: renderedBody }}></body>
    </html>
  );
}
