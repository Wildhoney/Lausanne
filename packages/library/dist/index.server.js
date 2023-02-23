import { h } from "./utils.js";
import * as utils from "./utils.js";
export { h } from "./utils.js";
export function render(tree, options) {
  return utils.render(tree, { ...options, isServer: true });
}
export function create(name, getTree) {
  const tree = getTree();
  const fingerprint = Buffer.from(render(tree, { isServer: true })).toString(
    "base64"
  );
  return h(
    name,
    { [utils.options.attrName]: fingerprint },
    h("template", { shadowroot: "open" }, tree)
  );
}
export function template({ title = "Lausanne", app }) {
  return h(
    "html",
    { lang: "en" },
    h(
      "head",
      null,
      h("title", null, title),
      h("meta", { charset: "UTF-8" }),
      h("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      }),
      h("meta", { "http-equiv": "X-UA-Compatible", content: "ie=edge" }),
      h(
        "script",
        { type: "importmap" },
        `{"imports": {
                    "lausanne": "/client/library/dist/index.client.js"
                }}`
      ),
      h("script", {
        type: "module",
        src: "/client/app/dist/index.js",
        async: true,
        defer: true,
      })
    ),
    h("body", null, app)
  );
}
