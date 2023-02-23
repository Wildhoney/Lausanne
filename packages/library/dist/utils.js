export const options = {
  attrName: "data-swiss",
};
export function h(name, attrs = {}, ...children) {
  return {
    name,
    attrs,
    children: children.flat(),
  };
}
export function render(tree, options) {
  if (typeof tree === "string") return tree;
  if (typeof tree.name === "object") return render(tree.name, options);
  if (Array.isArray(tree))
    return tree.map((vnode) => render(vnode, options)).join("");
  const attrs = !tree.attrs
    ? ""
    : Object.entries(tree.attrs)
        .map(([key, value]) => {
          switch (value) {
            case false:
            case null:
            case undefined:
              return "";
            case true:
              return key;
          }
          return options.isServer && typeof value === "function"
            ? ""
            : `${key}="${value}"`;
        })
        .join(" ");
  return `<${tree.name} ${attrs.trim()}>${render(tree.children, options)}</${
    tree.name
  }>`;
}
