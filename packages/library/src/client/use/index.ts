import { useContext, useMemo } from "preact/hooks";
import { Env, use as baseUse } from "../../global/use/index.js";
import { LoaderResponse } from "../../global/use/types.js";
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
  loader<Initial, State>(
    _: string,
    loader: () => Promise<State>,
    initial: Initial,
    deps: any[]
  ): LoaderResponse<Initial, State> {
    const [data, setData] = use.state<Initial | State>(initial);
    const [loading, setLoading] = use.state<boolean>(true);
    const [error, setError] = use.state<null | Error>(null);

    use.effect(() => {
      setLoading(true);

      loader()
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, deps);

    return { data, loading, error } as LoaderResponse<Initial, State>;
  },
};
