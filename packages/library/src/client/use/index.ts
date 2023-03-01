import { useContext, useMemo } from "preact/hooks";
import { Env, use as baseUse } from "../../global/use/index.js";
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
};
