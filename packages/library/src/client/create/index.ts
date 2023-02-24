import { traverse } from "./utils.js";

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
