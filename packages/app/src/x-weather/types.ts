import { Static, Type } from "@sinclair/typebox";
import { places } from "./utils.js";

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

// ---

export const Weather = Type.Object({
  main: Type.Object({
    temp: Type.Number(),
  }),
  weather: Type.Array(
    Type.Object({ description: Type.String() }, { minProperties: 1 })
  ),
});

export type Weather = Static<typeof Weather>;
