import { useContext } from "preact/hooks";
import { parse, join } from "node:path";
import { Env, use as baseUse } from "../../global/use/index.js";
import { stripTrailingSlashes } from "./utils.js";
import {
  DispatchEventOptions,
  DispatchEventPayload,
} from "../../client/create/types.js";

export const use = {
  ...baseUse,
  path(componentPath: string) {
    const env = useContext(Env);
    const componentDir = parse(componentPath.replace("file://", "")).dir;

    return (resourcePath: string): string => {
      const assetPath = join(componentDir, resourcePath).replace(env.root, "");
      return `${stripTrailingSlashes(env.path)}/${assetPath}`;
    };
  },
  dispatch() {
    return (
      name: string,
      payload: DispatchEventPayload,
      options: DispatchEventOptions = {}
    ): void => {
      void [name, payload, options];
    };
  },
};
