export type SwissTree<Attrs extends AttrsGeneric> = {
  error: any;
  attrs: {
    [K in keyof Attrs]: Attrs[K] extends string ? Attrs[K] : string;
  };
};

export type AttrsGeneric = Record<string, unknown>;
