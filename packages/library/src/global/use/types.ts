import * as type from "../transformers/index.js";

export type EnvContext = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
};

export type AttrsContext = Record<string, string>;

type ValueOf<T> = T[keyof T];

type MappedTypes = {
  string: typeof type.String;
  int: typeof type.Int;
};

export type MapGeneric = Record<string, ValueOf<MappedTypes>>;

export type AttrsReturn<Map extends MapGeneric> = {
  [K in keyof Map]: ReturnType<MappedTypes[Map[K]["_type"]]>;
};
