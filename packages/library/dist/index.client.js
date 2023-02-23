import * as utils from "./utils.js";
export { h } from "./utils.js";
const trees = new Map();
export function render(tree, options) {
  return utils.render(tree, { ...options, isServer: false });
}
export function create(name, getTree) {
  const tree = getTree();
  const fingerprint = window.btoa(utils.render(tree, { isServer: true }));
  trees.set(fingerprint, tree);
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      connectedCallback() {
        const tree = trees.get(this.getAttribute(utils.options.attrName));
        traverse(tree, this);
      }
    }
  );
}
function traverse(tree, node) {
  const root = node.shadowRoot ?? node;
  const walker = document.createTreeWalker(
    root.firstChild,
    NodeFilter.SHOW_ALL
  );
  function next(tree) {
    const [vnode, ...vnodes] = Array.isArray(tree) ? tree : [tree];
    if (vnode.attrs) {
      Object.entries(vnode.attrs).forEach(([attrName, eventListener]) => {
        if (typeof eventListener === "function") {
          const eventName = attrName.replace(/^on/i, "").toLowerCase();
          walker.currentNode.addEventListener(eventName, eventListener);
        }
      });
    }
    if (vnodes.length > 0) {
      vnodes.forEach((vnode) => {
        walker.nextSibling();
        next(vnode);
      });
    }
    if (vnode.children?.length > 0) {
      walker.firstChild();
      next(vnode.children);
    }
  }
  next(tree);
}
