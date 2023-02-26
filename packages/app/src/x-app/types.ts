import { Static, Type } from "@sinclair/typebox";

const Continents = Type.Union([
  Type.Literal("Asia"),
  Type.Literal("Africa"),
  Type.Literal("North America"),
  Type.Literal("Europe"),
  Type.Literal("South America"),
  Type.Literal("Oceania"),
  Type.Literal("Antartica"),
]);

export type Place = { continent: Static<typeof Continents>; country: string };

export const Attrs = Type.Object({
  continent: Continents,
});

export type Attrs = Static<typeof Attrs>;
