import { createSignal, JSXElement } from "solid-js";

export async function render(tree: JSXElement) {
  const { renderToString } = await import("solid-js/web");
  return renderToString(() => tree);
}
