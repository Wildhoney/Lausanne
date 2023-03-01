import { create, node, use } from "lausanne";

import type { Attrs } from "./types.js";
import { Unit } from "./types.js";
import { gradientColours, useWeather } from "./utils.js";
import Logo from "./components/logo/index.js";
import City from "./components/city/index.js";

export default create<Attrs>("x-weather", ({ attrs }) => {
  const path = use.path(import.meta.url);
  const [unit, setUnit] = use.state<Unit>(Unit.Celsius);
  const { isLoading, weather } = useWeather(attrs.city);

  const colour = use.memo(
    () => gradientColours[Math.floor(Math.random() * gradientColours.length)],
    []
  );

  return (
    <section class="weather">
      {weather && (
        <City
          city={attrs.city}
          weather={weather}
          unit={unit}
          onUnitChange={setUnit}
        />
      )}

      <Logo />

      <node.StyleSheet href={path("../../src/x-weather/styles.css")} />
      <node.Variables gradientColour={colour} />
    </section>
  );
});
