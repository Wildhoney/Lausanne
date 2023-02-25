// @ts-nocheck

import { h } from "preact";

export function create<Attrs = Record<string, any>>(name, Tree) {
  return function Swiss(attrs: Attrs) {
    return h(
      name,
      attrs,
      <template shadowroot="open">
        <Tree {...attrs} />
      </template>
    );
  };
}
