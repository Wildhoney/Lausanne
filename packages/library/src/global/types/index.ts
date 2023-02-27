export type AttrsGeneric = Record<string, unknown>;

export type SwissAttrs<Attrs extends AttrsGeneric> = {
  attrs: {
    [K in keyof Attrs]: Attrs[K] extends string ? Attrs[K] : string;
  };
  error: null | Error;
};
