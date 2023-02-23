export function create(name, tree) {
  return h(name, { 'data-swiss': true }, <template shadowroot="open">{tree()}</template>);
}

export function h(name, attrs = {}, ...children) {
  return {
    name,
    attrs,
    children: children.flat(),
  };
}

export function render(tree): string {
  if (typeof tree === "string") return tree;
  if (typeof tree.name === "object") return render(tree.name);
  if (Array.isArray(tree)) return tree.map(render).join('');

  const attrs = !tree.attrs ? "" : Object.entries(tree.attrs).map(([key, value]) => {
    switch (value) {
      case false: case null: case undefined: return '';
      case true: return key
    }

    return `${key}="${value}"`
  }).join(' ');

  return `<${tree.name} ${attrs.trim()}>${render(tree.children)}</${tree.name}>`;
}

export function template({title = "Lausanne", app}) {
  return <html lang="en">
    <head>
      <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    </head>

    <body>
      {app}
    </body>

  </html>
}