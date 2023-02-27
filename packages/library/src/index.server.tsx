import { VNode, h } from "preact";
import { renderToString } from "preact-render-to-string";
import { Env } from "./global/use/index.js";
import { EnvContext } from "./global/use/types.js";

export { node } from "./global/node/index.js";
export * as type from "./global/transformers/index.js";
export { Fragment, VNode } from "preact";
export { use } from "./server/use/index.js";
export { create } from "./server/create/index.js";

export { h };

export function render(App: VNode, options: Omit<EnvContext, "node">) {
  return renderToString(
    <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
  );
}
