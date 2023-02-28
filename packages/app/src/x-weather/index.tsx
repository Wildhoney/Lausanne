import { create, node, use } from "lausanne";
import Units from "./components/units/index.js";
import Forecast from "./components/forecast/index.js";

import type { Attrs, Weather } from "./types.js";
import { Unit } from "./types.js";
import { fetch, gradientColours } from "./utils.js";
import Cities from "./components/cities/index.js";
import Meta from "./components/meta/index.js";
import Logo from "./components/logo/index.js";
import Coords from "./components/coords/index.js";

export default create<Attrs>("x-weather", ({ attrs }) => {
  const path = use.path(import.meta.url);
  const [weather, setWeather] = use.state<null | Weather>(null);
  const [unit, setUnit] = use.state<Unit>(Unit.Celsius);

  use.effect(() => {
    fetch(attrs.city).then((weather) => setWeather(weather));
  }, [attrs.city]);

  const colour = use.memo(
    () => gradientColours[Math.floor(Math.random() * gradientColours.length)],
    []
  );

  return (
    <>
      {weather && (
        <>
          <section class="weather">
            <section>
              <Forecast city={attrs.city} unit={unit} weather={weather} />
            </section>

            <section class="details">
              <Units value={unit} onChange={setUnit} />
              <Meta weather={weather} unit={unit} />
              <Cities value={attrs.city} />
            </section>

            <Logo />
            <Coords value={weather.coord} />
          </section>
        </>
      )}

      <node.StyleSheet href={path("../../src/x-weather/styles.css")} />
      <node.Variables gradientColour={colour} />
    </>
  );
});
