import { useContext, useMemo } from "preact/hooks";
import { Env, use as baseUse } from "../../global/use/index.js";
import { DeferredFn, DeferredResponse } from "../../global/use/types.js";
import { dispatchEvent } from "../create/utils.js";

export const use = {
  ...baseUse,
  path(componentUrl: string): (resourcePath: string) => string {
    return (resourcePath: string): string => {
      return new URL(resourcePath, componentUrl).href;
    };
  },
  dispatch<Attrs>() {
    const env = useContext(Env);
    return useMemo(
      () => env.node instanceof HTMLElement && dispatchEvent<Attrs>(env.node),
      [env.node]
    );
  },
  deferred<S, IS = unknown>(
    _: string,
    fn: DeferredFn,
    initialState: IS,
    deps: any[]
  ): DeferredResponse<IS, S> {
    const [data, setData] = use.state(initialState);
    const [loading, setLoading] = use.state<boolean>(true);
    const [error, setError] = use.state<null | Error>(null);

    use.effect(() => {
      setLoading(true);

      fn()
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, deps);

    return { data, loading, error } as DeferredResponse<IS, S>;
  },
};
