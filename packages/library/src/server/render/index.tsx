import { VNode, createContext } from "preact";
import { renderToString } from "preact-render-to-string";
import { Env } from "../../global/use/index.js";
import { EnvContext } from "../../global/use/types.js";
import { Loaders } from "./types.js";

export const Loader = createContext<Set<Loaders>>(new Set());

export async function render(App: VNode, options: Omit<EnvContext, "node">) {
  const loaders = new Set<Loaders>();

  renderToString(
    <Loader.Provider value={loaders}>
      <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
    </Loader.Provider>
  );

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
      <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
    </Loader.Provider>
  );
}
