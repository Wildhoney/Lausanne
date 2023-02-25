// @ts-nocheck

import { h } from "preact";

export function create<Attrs>(name, Tree) {
  return function Swiss(attrs: Attrs) {
    return h(
      name,
      { "data-swiss": true },
      <template shadowroot="open">
        <Tree />
      </template>
    );
  };
}
