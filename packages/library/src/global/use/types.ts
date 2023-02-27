import * as type from "../transformers/index.js";
import { AttrsGeneric } from "../types/index.js";

export type EnvContext = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
};

export type AttrsContext = Record<string, string>;

export type AttrsArg<Attrs extends AttrsGeneric> = {
  [K in keyof Attrs]: typeof type.String | typeof type.Int
}

type MappedTypes = {
  string: typeof type.String
  int: typeof type.Int
}

export type AttrsReturn<Attrs extends AttrsGeneric, Map extends AttrsArg<Attrs>> = {
  [K in keyof Attrs]: ReturnType<MappedTypes[Map[K]['_type']]>;
}