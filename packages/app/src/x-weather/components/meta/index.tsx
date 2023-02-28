import { VNode, node } from "lausanne";
import { Unit } from "../../types.js";
import { toFahrenheit } from "../../utils.js";
import Item from "../item/index.js";
import { Props } from "./types.js";

export default function Meta({ weather, unit }: Props): VNode {
  return (
    <>
      <Item
        label="feels like"
        value={
          unit === Unit.Celsius ? (
            <>{Math.round(weather.main.feels_like)}&#8451;</>
          ) : (
            <>{Math.round(toFahrenheit(weather.main.feels_like))}&#8457;</>
          )
        }
      />

      <Item
        label="min/max"
        value={
          <>
            {weather.main.temp_min} &ndash; {weather.main.temp_max}
          </>
        }
      />
      <Item label="pressure" value={weather.main.pressure} />
      <Item label="humidity" value={weather.main.humidity} />
      <Item label="timezone" value={weather.timezone} />
      <Item label="visibility" value={weather.visibility} />
      <Item
        label="wind"
        value={
          <>
            {weather.wind.speed}mph ({weather.wind.deg}&deg;)
          </>
        }
      />
    </>
  );
}
