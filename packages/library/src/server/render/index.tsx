import { VNode, createContext } from "preact";
import { renderToString } from "preact-render-to-string";
import { Env } from "../../global/use/index.js";
import { EnvContext } from "../../global/use/types.js";
import { Loaders } from "./types.js";

export const Loader = createContext<Set<Loaders>>(new Set());

const envProps = {
  node: null,
  isServer: true,
  isClient: false,
};

export async function render(
  App: VNode,
  options: Omit<EnvContext, "node" | "isServer" | "isClient">
) {
  const loaders = new Set<Loaders>();

  const tree = renderToString(
    <Loader.Provider value={loaders}>
      <Env.Provider value={{ ...options, ...envProps }}>{App}</Env.Provider>
    </Loader.Provider>
  );

  if (loaders.size === 0) {
    return tree;
  }

  const data = new Set(
    await Promise.all(
      [...loaders].map(async (loader) => {
        const value = await loader.value;
        return { ...loader, value };
      })
    )
  );

  return renderToString(
    <Loader.Provider value={data}>
      <Env.Provider value={{ ...options, ...envProps }}>{App}</Env.Provider>
    </Loader.Provider>
  );
}
