import { isText, isPrimitive } from "../../global/h/utils.js";
import { isFragment, isFunction, isNested, isState } from "./utils.js";

export function render(vnode: any): string {
  if (isText(vnode)) return vnode.items.map(render).join("");
  if (isState(vnode)) return vnode.value();
  if (isPrimitive(vnode)) return vnode;
  if (isNested(vnode)) return render(vnode.name);
  if (isFragment(vnode)) return vnode.map((vnode) => render(vnode)).join("");

  const attrs = !vnode.attrs
    ? ""
    : Object.entries(vnode.attrs)
        .map(([key, value]) => (isFunction(value) ? "" : `${key}="${value}"`))
        .join(" ");

  const name = `${vnode.name} ${attrs.trim()}`.trim();

  return `<${name}>${render(vnode.children)}</${vnode.name}>`;
}
