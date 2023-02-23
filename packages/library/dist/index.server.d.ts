export { h } from "./utils.js";
export declare function render(tree: any, options?: any): string;
export declare function create(
  name: any,
  getTree: any
): {
  name: any;
  attrs: {};
  children: any[];
};
export declare function template({
  title,
  app,
}: {
  title?: string;
  app: any;
}): any;
