import { h } from "preact";

export function template({ title = "Lausanne", app }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <script type="importmap">
          {`{"imports": {
                      "lausanne": "/client/library/dist/index.client.js",
                      "preact": "https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.0/preact.min.js"
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
