import { Static, Type } from "@sinclair/typebox";
import { Unit } from "../x-weather/types.js";

export const Attrs = Type.Object({
  onUnitChange: Type.Function(
    [
      Type.Object({
        detail: Type.Object({
          unit: Type.Union([
            Type.Literal(Unit.Celsius),
            Type.Literal(Unit.Fahrenheit),
          ]),
        }),
      }),
    ],
    Type.Void()
  ),
});

export type Attrs = Static<typeof Attrs>;
