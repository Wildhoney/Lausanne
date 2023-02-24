import { h } from "../../global/h/index.js";

export function create(name, getTree) {
  return h(
    name,
    { "data-swiss": true },
    <template shadowroot="open">{getTree()}</template>
  );
}
