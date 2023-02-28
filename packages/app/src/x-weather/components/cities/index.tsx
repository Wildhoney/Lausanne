import { Props } from "./types.js";
import { use, node } from "lausanne";
import { places } from "../../utils.js";

export default function Cities({ value }: Props) {
  const env = use.env();

  const handleChange = use.callback((event) => {
    env.node.setAttribute("city", event.target.value);
  }, []);

  return (
    <section class="cities">
      <select value={value} onChange={handleChange}>
        {places.map((place) => (
          <option key={`${place.city}-${place.country}`} value={place.city}>
            {place.city}, {place.country}
          </option>
        ))}
      </select>
    </section>
  );
}
