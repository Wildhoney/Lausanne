import { Props } from "./types.js";
import { use } from "lausanne";
import { places } from "../../utils.js";

export default function Places({ value }: Props) {
  const env = use.env();

  const handleChange = use.callback((event: Event) => {
    env.node?.setAttribute("city", (event?.target as any).value);
  }, []);

  return (
    <section class="places">
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
