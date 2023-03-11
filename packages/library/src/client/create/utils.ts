import { AttrsGeneric, SwissEvent } from "../../global/types/index.js";
import { toCamelcase } from "../../global/utils/index.js";
import type {
  DispatchEventOptions,
  DispatchEventPayload,
} from "./types.js";

export const getAttributes = (attrs: NamedNodeMap): any =>
  Object.values(attrs).reduce((attrs, attr) => {
    const name = toCamelcase(attr.nodeName).fromKebab();

    return {
      ...attrs,
      [name]: attr.nodeValue,
    };
  }, {});

export function hasApplicableMutations(
  node: HTMLElement,
  mutations: MutationRecord[]
): boolean {
  return mutations.some((mutation) => {
    const { attributeName, oldValue } = mutation;
    return attributeName
      ? oldValue !== node.getAttribute(attributeName)
      : false;
  });
}

export function dispatchEvent<Attrs>(node: HTMLElement) {
  return (
    name: Attrs extends AttrsGeneric ? SwissEvent<keyof Attrs> : string,
    payload: DispatchEventPayload,
    options: DispatchEventOptions = {}
  ) => {
    const model = typeof payload === "object" ? payload : { value: payload };

    return node.dispatchEvent(
      new window.CustomEvent(name as string, {
        bubbles: true,
        composed: true,
        ...options,
        detail: { ...model, version: 6 },
      })
    );
  };
}