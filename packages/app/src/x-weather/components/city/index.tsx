import { VNode, node } from "lausanne";
import Coordinates from "../coordinates/index.js";
import Forecast from "../forecast/index.js";
import Meta from "../meta/index.js";
import Places from "../places/index.js";
import Units from "../units/index.js";
import { Props } from "./types.js";

export default function City({
  city,
  weather,
  unit,
  onUnitChange,
}: Props): VNode {
  return (
    <>
      <section class="city">
        <Forecast city={city} unit={unit} weather={weather} />

        <div class="details">
          {/* <div class="controls">
            <Units value={unit} onChange={onUnitChange} />
          </div> */}
          <Meta weather={weather} unit={unit} />
          <Places value={city} />
        </div>

        {/* <div class="details"> */}
        {/*
         */}
        {/* <Places value={city} /> */}
        {/* </div> */}
      </section>

      <Coordinates value={weather.coord} />
    </>
  );
}
