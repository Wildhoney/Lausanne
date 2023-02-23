export declare const options: {
  attrName: string;
};
export declare function h(
  name: any,
  attrs?: {},
  ...children: any[]
): {
  name: any;
  attrs: {};
  children: any[];
};
type RenderOptions = {
  isServer: boolean;
};
export declare function render(tree: any, options: RenderOptions): string;
export {};
