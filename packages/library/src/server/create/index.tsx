import { h, VNode } from "preact";
import { AttrsGeneric, SwissTree } from "../../global/types/index.js";
import { Attrs } from "../../global/use/index.js";

export function create<Attrs extends AttrsGeneric>(
  name: string,
  Tree: (props: SwissTree<Attrs>) => VNode
) {
  return function Swiss(attrs) {
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
