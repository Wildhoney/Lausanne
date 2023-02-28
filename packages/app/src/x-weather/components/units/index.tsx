import { VNode, node } from "lausanne";
import { Unit } from "../../types.js";
import { Props } from "./types.js";

export default function Units({ value, onChange }: Props): VNode {
  return (
    <section class="units">
      <label>units:</label>

      {/* <img src="https://openweathermap.org/img/wn/02n@2x.png" /> */}
      <button
        class={value === Unit.Celsius && "active"}
        onClick={() => onChange(Unit.Celsius)}
      >
        celsius
      </button>
      <div class="separator">/</div>
      <button
        aria-label=""
        class={value === Unit.Fahrenheit && "active"}
        onClick={() => onChange(Unit.Fahrenheit)}
      >
        fahrenheit
      </button>
    </section>
  );
}
