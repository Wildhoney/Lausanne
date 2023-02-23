import { h } from "./utils.js";
import * as utils from "./utils.js";

export { h } from "./utils.js";

export function render(tree, options?) {
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
    <template shadowroot="open">{tree}</template>
  );
}

export function template({ title = "Lausanne", app }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <script type="importmap">
          {`{"imports": {
                    "lausanne": "/client/library/dist/index.client.js"
                }}`}
        </script>

        <script
          type="module"
          src="/client/app/dist/index.js"
          async
          defer
        ></script>
      </head>
      <body>{app}</body>
    </html>
  );
}
