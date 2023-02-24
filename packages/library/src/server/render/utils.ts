import { kinds } from "../../global/use/index.js";

export function isFunction(a): boolean {
  return typeof a === "function";
}

export function isState(vnode: any) {
  return vnode?.kind === kinds.state;
}

export function isNested(vnode: any) {
  return typeof vnode?.name === "object";
}

export function isFragment(vnode: any) {
  return Array.isArray(vnode);
}
