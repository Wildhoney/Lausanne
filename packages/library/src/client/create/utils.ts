import { isText } from "../../global/h/utils.js";
import { use } from "../../global/use/index.js";
import { isState } from "../../server/render/utils.js";

export function traverse(tree: any, node: HTMLElement): void {
  const root = node.shadowRoot ?? node;

  function next(tree: any, node: any) {
    const vnodes = [].concat(tree);
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
    walker.firstChild();

    for (const vnode of vnodes) {
      const node = walker.currentNode;

      if (node.nodeType === Node.TEXT_NODE && isText(vnode)) {
        use.effect(() => {
          (node as any).nodeValue = vnode.items
            .map((item) => (isState(item) ? item.value() : item))
            .join("");
        });
      }

      const { children = [] } = vnode;
      for (const vnode of children) {
        next(vnode, node);
      }

      walker.nextSibling();
    }
  }

  next(tree, root);
}
