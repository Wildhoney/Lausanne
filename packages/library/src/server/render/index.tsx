import { VNode, h, createContext } from "preact";
import { renderToString } from "preact-render-to-string";
import { Env } from "../../global/use/index.js";
import { EnvContext } from "../../global/use/types.js";
import { Defers } from "./types.js";

export const Deferred = createContext<Set<Defers>>(new Set());

export async function render(App: VNode, options: Omit<EnvContext, "node">) {
  const defers = new Set<Defers>();

  renderToString(
    <Deferred.Provider value={defers}>
      <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
    </Deferred.Provider>
  );

  const data = new Set(
    await Promise.all(
      [...defers].map(async (defer) => {
        const value = await defer.value;
        return { ...defer, value };
      })
    )
  );

  return renderToString(
    <Deferred.Provider value={data}>
      <Env.Provider value={{ ...options, node: null }}>{App}</Env.Provider>
    </Deferred.Provider>
  );
}
