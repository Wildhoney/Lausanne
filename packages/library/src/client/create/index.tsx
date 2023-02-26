// @ts-nocheck

import { hydrate, h } from "preact";
import { memo } from "preact/compat";
import { Env } from "../../global/use/index.js";
import { getAttributes } from "./utils.js";

export function create(name, Tree) {
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      private observer?: MutationObserver;
      private context = {
        path: window.location.origin,
        root: null,
        node: this,
      };

      connectedCallback() {
        this.observer = new window.MutationObserver(
          (mutations) =>
            hasApplicableMutations(this, mutations) && this.render()
        );

        this.observer.observe(this, {
          attributes: true,
          attributeOldValue: true,
        });

        this.render();
      }

      disconnectedCallback() {
        this.observer?.disconnect();
      }

      render() {
        const attrs = getAttributes(this.attributes);
        const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });

        hydrate(
          <Env.Provider value={this.context}>
            <Tree attrs={attrs} error={null} />
          </Env.Provider>,
          root
        );
      }
    }
  );

  return memo(
    () => h(name),
    () => true
  );
}
