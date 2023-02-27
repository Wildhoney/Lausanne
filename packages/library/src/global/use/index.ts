import { createContext } from "preact";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "preact/hooks";
import { AttrsContext, EnvContext } from "./types.js";

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
  mount: (fn) => useEffect(fn, []),
  unmount: (fn) => useEffect(() => fn, []),
  env: () => useContext(Env),
  attrs<Attrs>(map: Partial<Attrs>): Record<string, string> {
    const attrs = useContext(Attrs);
    return Object.entries(attrs).reduce(
      (attrs, [key, value]) => ({
        ...attrs,
        [key]: (map[key] ?? String)(value),
      }),
      {}
    );
  },
};
