// @ts-nocheck

import { h, VNode } from "preact";
import SwissTree from "../../global/tree/index.js";
import { AttrsGeneric, SwissAttrs } from "../../global/types/index.js";

export function create<Attrs extends AttrsGeneric>(
  name: string,
  Tree: (attrs: SwissAttrs<Attrs>) => VNode
) {
  return function Swiss(attrs: Attrs) {
    return h(
      name,
      attrs,
      h(
        "template",
        { shadowroot: "open" } as unknown,
        <SwissTree Tree={Tree} attrs={attrs} />
      )
    );
  };
}
