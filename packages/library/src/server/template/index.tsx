import { h } from "../../global/h/index.js";

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
                      "lausanne": "/client/library/dist/index.client.js",
                      "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.6.11/+esm"
                  }}`}
        </script>

        <script
          type="module"
          src="/client/app/dist/index.js"
          async
          defer
        ></script>
      </head>
      <body>
        <div id="app"></div>
        {app}
      </body>
    </html>
  );
}
