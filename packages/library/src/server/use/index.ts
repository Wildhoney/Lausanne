import { useContext } from "preact/hooks";
import { parse, join } from "node:path";
import { Env, use as baseUse } from "../../global/use/index.js";
import { stripTrailingSlashes } from "./utils.js";
import {
  DispatchEventOptions,
  DispatchEventPayload,
} from "../../client/create/types.js";
import { AttrsGeneric, SwissEvent } from "../../global/types/index.js";
import { Loader } from "../render/index.js";
import { LoaderFn, LoaderResponse } from "../../global/use/types.js";

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
  dispatch<Attrs>() {
    return (
      name: Attrs extends AttrsGeneric ? SwissEvent<keyof Attrs> : string,
      payload: DispatchEventPayload,
      options: DispatchEventOptions = {}
    ): void => {
      void [name, payload, options];
    };
  },
  loader<S, IS = unknown>(
    id: string,
    fn: LoaderFn,
    initialState: IS,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: any[]
  ): LoaderResponse<IS, S> {
    const loaders = useContext(Loader);
    const data = [...loaders].find((loader) => loader.id === id);

    if (data) {
      return {
        data: data.value,
        loading: false,
        error: null,
      } as LoaderResponse<IS, S>;
    }

    const value = fn();
    loaders.add({ id, value });

    return {
      data: initialState,
      loading: true,
      error: null,
    } as LoaderResponse<IS, S>;
  },
};
