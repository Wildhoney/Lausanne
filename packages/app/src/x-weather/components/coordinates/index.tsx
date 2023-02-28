import { Props } from "./types.js";
import { node } from "lausanne";

export default function Coordinates({ value }: Props) {
  return (
    <section class="coordinates">
      {value.lat}, {value.lon}
    </section>
  );
}
