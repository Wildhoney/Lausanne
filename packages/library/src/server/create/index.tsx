// @ts-nocheck

import { h, VNode } from "preact";
import { AttrsGeneric, SwissAttrs } from "../../global/types/index.js";
import { Attrs } from "../../global/use/index.js";

export function create<Attrs extends AttrsGeneric>(
  name: string,
  Tree: (attrs: SwissAttrs<Attrs>) => VNode
) {
  return function Swiss(attrs: Attrs) {
    return h(
      name,
      attrs,
      <Attrs.Provider value={attrs}>
        {h(
          "template",
          { shadowroot: "open" } as unknown,
          <Tree attrs={attrs} error={null} />
        )}
      </Attrs.Provider>
    );
  };
}
