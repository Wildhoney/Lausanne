import { VNode } from "preact";

export type Tree<Attrs> = (attrs: Attrs) => VNode;

export type RenderOptions = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
};

export type ToCamelcase = { fromKebab: () => string; fromSnake: () => string };

export type FromCamelcase = { toKebab: () => string; toSnake: () => string };

export type DispatchEventPayload = Record<string, unknown>;

export type DispatchEventOptions = Record<string, unknown>;
