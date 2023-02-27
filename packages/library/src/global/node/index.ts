import { Fragment, h, VNode } from "preact";
import { useMemo } from "preact/hooks";
import { fromCamelcase } from "../../client/create/utils.js";
import { StyleSheetProps, VariablesProps } from "./types.js";

export const node = {
  h,
  Fragment,
  StyleSheet({ href, media }: StyleSheetProps): VNode {
    return h("link", { rel: "stylesheet", type: "text/css", media, href });
  },
  Variables(props: VariablesProps, container = ":host"): VNode {
    const vars = useMemo(() => {
      return Object.entries(props).reduce(
        (accum, [key, value]) =>
          `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
        ""
      );
    }, [props]);

    return h("style", { type: "text/css" }, `${container} { ${vars} }`);
  },
};
