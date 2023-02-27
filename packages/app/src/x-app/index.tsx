import { create, node, use } from "lausanne";

import { Attrs } from "./types.js";
import { places } from "./utils.js";

export default create<Attrs>("x-app", ({ error, attrs }) => {
  const path = use.path(import.meta.url);
  // const parsedAttrs = use.attrs<Attrs>({ logo: type.String });
  const [index, setIndex] = use.state<number>(0);
  const place = places?.[index];
  const isAtBeginning = index === 0;
  const isAtEnd = index === places.length - 1;

  if (error) {
    return <h1>Error: {error.message}!</h1>;
  }

  return (
    <>
      <node.StyleSheet href={path("../../styles/index.css")} />

      <section>
        <button __disabled={isAtBeginning} onClick={() => setIndex(index - 1)}>
          &lt;
        </button>

        <h1>
          {place.country}, {place.continent}
        </h1>

        <button __disabled={isAtEnd} onClick={() => setIndex(index + 1)}>
          &gt;
        </button>
      </section>
    </>
  );
});
