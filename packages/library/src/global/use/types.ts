import * as type from "../transformers/index.js";

export type EnvContext = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
};

export type AttrsContext = Record<string, string>;

type ValueOf<T> = T[keyof T];

export type MapGeneric = Record<string, ValueOf<typeof type>>;

export type AttrsReturn<Map extends MapGeneric> = {
  [K in keyof Map]: ReturnType<Map[K]>;
};

export type DeferredFn = (...args: any[]) => Promise<any>;

export type DeferredResponse<InitialState, State> = {
  error: Error | null;
  loading: boolean;
  data: InitialState | State;
};
