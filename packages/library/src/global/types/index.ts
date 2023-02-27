export type SwissTree<Attrs extends AttrsGeneric> = {
  error: null | Error;
  attrs: {
    [K in keyof Attrs]: Attrs[K] extends string ? Attrs[K] : string;
  };
};

export type AttrsGeneric = Record<string, unknown>;
