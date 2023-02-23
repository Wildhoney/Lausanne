import * as utils from "./utils.js";

export { h } from "./utils.js";

export function render(tree, options?) {
  return utils.render(tree, { ...options, isServer: false });
}

export function create(name, getTree) {
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      connectedCallback() {
        const tree = getTree();
        traverse(tree, this);
      }
    }
  );
}

function traverse(tree: any, node: HTMLElement): void {
  const root = node.shadowRoot ?? node;
  const walker = document.createTreeWalker(
    root.firstChild,
    NodeFilter.SHOW_ALL
  );

  function next(tree: any) {
    const [vnode, ...vnodes] = [].concat(tree);
    const node = walker.currentNode as any;

    if (node?.hasAttribute?.('x-swiss')) {
      return;
    }
    
    if (vnode.attrs) {
      Object.entries(vnode.attrs).forEach(([attrName, eventListener]) => {
        if (typeof eventListener === "function") {
          const eventName = attrName.replace(/^on/i, "").toLowerCase();
          walker.currentNode.addEventListener(eventName, eventListener as any);
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
