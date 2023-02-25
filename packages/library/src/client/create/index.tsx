// @ts-nocheck

import { hydrate, h } from "preact";
import { memo } from "preact/compat";
import { getAttributes } from "./utils.js";

export function create(name, Tree) {
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      connectedCallback() {
        const attrs = getAttributes(this.attributes);
        const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
        hydrate(<Tree {...attrs} />, root);
      }
    }
  );

  return memo(
    () => h(name),
    () => true
  );
}
