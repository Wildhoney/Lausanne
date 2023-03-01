import { AttrsGeneric, SwissEvent } from "../../global/types/index.js";
import type {
  ToCamelcase,
  DispatchEventOptions,
  DispatchEventPayload,
  FromCamelcase,
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

export function toCamelcase(value: string): ToCamelcase {
  const f = (separator: string) => (): string => {
    const r = new RegExp(`(${separator}\\w)`, "g");
    return value.replace(r, (match) => match[1].toUpperCase());
  };

  return {
    fromKebab: f("-"),
    fromSnake: f("_"),
  };
}

export function fromCamelcase(value: string): FromCamelcase {
  const f = (separator: string) => (): string => {
    return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
  };

  return {
    toKebab: f("-"),
    toSnake: f("_"),
  };
}
