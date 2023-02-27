import { hydrate, h, VNode } from "preact";
import { memo } from "preact/compat";
import SwissTree from "../../global/tree/index.js";
import { AttrsGeneric, SwissAttrs } from "../../global/types/index.js";
import { Env } from "../../global/use/index.js";
import { getAttributes, hasApplicableMutations } from "./utils.js";

export function create<Attrs extends AttrsGeneric>(
  name: string,
  Tree: (attrs: SwissAttrs<Attrs>) => VNode
) {
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
            <SwissTree Tree={Tree} attrs={attrs} />
          </Env.Provider>,
          root
        );
      }
    }
  );

  return memo(
    () => h(name, {}),
    () => true
  );
}
