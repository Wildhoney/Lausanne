import { useContext } from "preact/hooks";
import { parse, join } from "node:path";
import { Env, use as baseUse } from "../../global/use/index.js";
import { stripTrailingSlashes } from "./utils.js";

export const use = {
  ...baseUse,
  path(componentPath) {
    const env = useContext(Env);
    const componentDir = parse(componentPath.replace("file://", "")).dir;

    return (resourcePath): string => {
      const assetPath = join(componentDir, resourcePath).replace(env.root, "");
      return `${stripTrailingSlashes(env.path)}/${assetPath}`;
    };
  },
};
