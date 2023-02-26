import { VNode, create, node, use } from "lausanne";

import { Attrs, Place } from "./types.js";
import { places } from "./utils.js";

export default create<Attrs>("x-app", ({ attrs, error }): VNode => {
  // const path = use.path(import.meta.url);
  // const attrs = use.attrs({ logo: type.String });
  const [index, setIndex] = use.state<number>(0);
  const place = places?.[index];
  const isAtBeginning = index === 0;
  const isAtEnd = index === places.length - 1;

  return (
    <>
      <section>
        <button disabled={isAtBeginning} onClick={() => setIndex(index - 1)}>
          &lt;
        </button>

        <h1>
          {place.country}, {place.continent}
        </h1>

        <button disabled={isAtEnd} onClick={() => setIndex(index + 1)}>
          &gt;
        </button>
      </section>
    </>
  );
});
