import { Props } from "./types.js";
import { node } from "lausanne";

export default function Coordinates({ value }: Props) {
  return (
    <section class="coordinates">
      Lat/lng: {value.lat}, {value.lon}
    </section>
  );
}
