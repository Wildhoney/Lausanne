import { hydrate, h } from "preact";
import { memo } from "preact/compat";

export function create(name, Tree) {
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      connectedCallback() {
        hydrate(<Tree />, this.shadowRoot);
      }
    }
  );

  return memo(Tree, () => true);
}
