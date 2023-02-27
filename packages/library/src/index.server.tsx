import { VNode, h } from "preact";
import { renderToString } from "preact-render-to-string";
import { Env } from "./global/use/index.js";
import { RenderOptions } from "./global/use/types.js";
export { node } from "./global/node/index.js";
export { h, Fragment, VNode } from "preact";
export { use } from "./server/use/index.js";
export { create } from "./server/create/index.js";
export { template } from "./server/template/index.js";

export function render(App: VNode, options: Omit<RenderOptions, "node">) {
  return renderToString(
    <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
  );
}
