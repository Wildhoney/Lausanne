import { isState } from "../../server/render/utils.js";
import { isPrimitive, isText, createText } from "./utils.js";

export function h(name, attrs = {}, ...children) {
  function parse(children, current) {
    const previous = children.at(-1);

    if (isPrimitive(current) || isState(current)) {
      if (isText(previous)) {
        return [
          ...children.splice(0, children.length - 1),
          createText(previous.items, current),
        ];
      } else {
        return [...children, createText(current)];
      }
    }

    return [...children, current];
  }

  return {
    name,
    attrs,
    children: [].concat(children).flat().reduce(parse, []),
  };
}
