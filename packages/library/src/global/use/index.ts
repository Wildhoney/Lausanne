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
  // mount(fn: EffectCallback) {
  //     useEffect(fn, []);
  // },
  // unmount(fn: EffectCallback) {
  //     useEffect(() => fn, []);
  // },
  // env() {
  //     return useContext(Env);
  // },
  path(componentUrl: string): (resourcePath: string) => string {
    const env = useContext(Env);

    return (resourcePath: string): string => {
      if (typeof window !== "undefined")
        return new URL(resourcePath, componentUrl).href;

      return "";

      // const url = componentUrl.replace('file://', '') ?? '';
      // return !env.path || !env.root
      //     ? resourcePath
      //     : `${env.path.replace(/(\/)*$/g, '')}/${url
      //           .replace(env.root, '')
      //           .replace(/^(\/)*/g, '')
      //           .replace(/\/[^/]*$/i, '')}/${resourcePath}`;
    };
  },
  // attrs<Attrs>(map: Partial<Attrs>): Record<string, string> {
  //     const attrs = useContext(Attrs);
  //     return Object.entries(attrs).reduce(
  //         (attrs, [key, value]) => ({ ...attrs, [key]: (map[key] ?? String)(value) }),
  //         {}
  //     );
  // },
  // dispatch() {
  //     const env = useContext(Env);
  //     return useMemo(() => env.node instanceof HTMLElement && dispatchEvent(env.node), [env.node]);
  // }
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
