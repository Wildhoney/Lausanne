import { createContext } from "preact";
import {
  EffectCallback,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "preact/hooks";
import { AttrsGeneric } from "../types/index.js";
import { AttrsArg, AttrsContext, AttrsReturn, EnvContext } from "./types.js";

export const Env = createContext<EnvContext>({
  path: null,
  root: null,
  node: null,
});

export const Attrs = createContext<AttrsContext>({});

export const use = {
  memo: useMemo,
  state: useState,
  effect: useEffect,
  callback: useCallback,
  reducer: useReducer,
  mount: (fn: EffectCallback) => useEffect(fn, []),
  unmount: (fn: EffectCallback) => useEffect(() => fn, []),
  env: () => useContext(Env),
  attrs<Attrs extends AttrsGeneric>(map: AttrsArg<Attrs>): AttrsReturn<Attrs, typeof map> {
    const attrs = useContext(Attrs);
    
    return Object.entries(attrs).reduce(
      (attrs, [key, value]) => ({
        ...attrs,
        [key]: (map[key] ?? String)(value),
      }),
      {}
    ) as AttrsReturn<Attrs, typeof map>;
  },
};
