import { createContext } from "preact";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "preact/hooks";
import { RenderOptions } from "./types.js";

export const Env = createContext<RenderOptions>({
  path: null,
  root: null,
  node: null,
});

export const use = {
  memo: useMemo,
  state: useState,
  effect: useEffect,
  callback: useCallback,
  reducer: useReducer,
  mount(fn) {
    useEffect(fn, []);
  },
  unmount(fn) {
    useEffect(() => fn, []);
  },
  env() {
    return useContext(Env);
  },
  // attrs<Attrs>(map: Partial<Attrs>): Record<string, string> {
  //     const attrs = useContext(Attrs);
  //     return Object.entries(attrs).reduce(
  //         (attrs, [key, value]) => ({ ...attrs, [key]: (map[key] ?? String)(value) }),
  //         {}
  //     );
  // },
};

// export const node = {
//   Fragment,
//   StyleSheet({ href, media }: StyleSheetProps): VNode {
//       return h('link', { rel: 'stylesheet', type: 'text/css', media, href });
//   },
//   Variables(props: VariablesProps): VNode {
//       const vars = useMemo(() => {
//           return Object.entries(props).reduce(
//               (accum, [key, value]) => `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
//               ''
//           );
//       }, [props]);

//       return h('style', { type: 'text/css' }, `:host { ${vars} }`);
//   },
// };
