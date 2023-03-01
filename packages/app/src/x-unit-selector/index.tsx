import { create, node, use } from "lausanne";
import { Unit } from "../x-weather/types.js";
import { Attrs } from "./types.js";

export default create<Attrs>("x-unit-selector", () => {
  const path = use.path(import.meta.url);
  const dispatch = use.dispatch();

  return (
    <>
      <section part="container">
        <button
          part="button"
          onClick={(): void => dispatch("UnitChange", { unit: Unit.Celsius })}
        >
          C&deg;
        </button>
        <button
          part="button"
          onClick={(): void =>
            dispatch("UnitChange", { unit: Unit.Fahrenheit })
          }
        >
          F&deg;
        </button>
      </section>

      <node.StyleSheet href={path("../../src/x-unit-selector/styles.css")} />
    </>
  );
});
