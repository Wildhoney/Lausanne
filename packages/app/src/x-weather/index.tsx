import { create, node, use } from "lausanne";

import { Attrs, Weather } from "./types.js";
import { fetch } from "./utils.js";

export default create<Attrs>("x-weather", () => {
  const city = "Rome";
  const path = use.path(import.meta.url);
  const [weather, setWeather] = use.state<null | Weather>(null);

  use.mount(() => {
    fetch(city).then((weather) => setWeather(weather));
  });

  return (
    <>
      {weather && (
        <section class="weather">
          {/* <textarea /> */}

          <img
            src={path(
              `../../src/x-weather/images/cities/${city.toLowerCase()}.png`
            )}
            alt={city}
          />

          <p class="description">
            <span>{weather.weather[0].description}</span> in {city}
          </p>
          <p class="celsius">{Math.round(weather.main.temp)}&#8451;</p>
          {/* <p class='fahrenheit'>{Math.round((weather.main.temp * 9) / 5 + 32)}&#8457;</p> */}
        </section>
      )}

      <node.StyleSheet href={path("../../src/x-weather/styles/index.css")} />
    </>
  );
});
