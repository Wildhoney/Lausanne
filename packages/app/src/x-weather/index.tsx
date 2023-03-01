import { create, node, use } from "lausanne";

import { Attrs, Weather } from "./types.js";
import { Unit } from "./types.js";
import { fetch, gradientColours } from "./utils.js";
import Logo from "./components/logo/index.js";
import City from "./components/city/index.js";
import Loading from "./components/loading/index.js";

export default create<Attrs>("x-weather", ({ attrs }) => {
  const path = use.path(import.meta.url);
  const [unit, setUnit] = use.state<Unit>(Unit.Celsius);
  const { data, loading } = use.deferred<Weather>(
    `x-weather/${attrs.city}`,
    () => fetch(attrs.city),
    null,
    [attrs.city]
  );

  const colour = use.memo(
    () => gradientColours[Math.floor(Math.random() * gradientColours.length)],
    []
  );

  return (
    <section class="weather">
      {data && (
        <City
          city={attrs.city}
          weather={data as any}
          unit={unit}
          onUnitChange={setUnit}
        />
      )}

      <Loading value={loading} />

      <Logo />

      <node.StyleSheet href={path("../../src/x-weather/styles.css")} />
      <node.Variables gradientColour={colour} />
    </section>
  );
});
