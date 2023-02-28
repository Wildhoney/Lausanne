import { Unit, Weather } from "../../types.js";
import { toFahrenheit } from "../../utils.js";
import { node, VNode } from "lausanne";

export const metaData = [
  {
    label: "feels like",
    icon: "feels-like.png",
    getValue(weather: Weather, unit: Unit): VNode {
      return unit === Unit.Celsius ? (
        <>{Math.round(weather.main.feels_like)}&#8451;</>
      ) : (
        <>{Math.round(toFahrenheit(weather.main.feels_like))}&#8457;</>
      );
    },
  },
  {
    label: "min/max",
    icon: "min-max.png",
    getValue(weather: Weather): VNode {
      return (
        <>
          {weather.main.temp_min} &ndash; {weather.main.temp_max}
        </>
      );
    },
  },
  {
    label: "pressure",
    icon: "pressure.png",
    getValue(weather: Weather): VNode {
      return <>{weather.main.pressure}</>;
    },
  },
  {
    label: "humidity",
    icon: "humidity.png",
    getValue(weather: Weather): VNode {
      return <>{weather.main.humidity}</>;
    },
  },
  {
    label: "timezone",
    icon: "timezone.png",
    getValue(weather: Weather): VNode {
      return <>{weather.timezone}</>;
    },
  },
  {
    label: "visibility",
    icon: "visibility.png",
    getValue(weather: Weather): VNode {
      return <>{weather.visibility}</>;
    },
  },
  {
    label: "wind",
    icon: "wind.png",
    getValue(weather: Weather): VNode {
      return (
        <>
          {weather.wind.speed} ({weather.wind.deg})&deg;
        </>
      );
    },
  },
];
