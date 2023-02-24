export function isPrimitive(child) {
  return typeof child === "number" || typeof child === "string";
}

const kinds = {
  text: Symbol("swiss/text"),
};

export function isText(child) {
  return child?.kind === kinds.text;
}

export function createText(...items) {
  return {
    kind: kinds.text,
    items: items.flat(),
  };
}
