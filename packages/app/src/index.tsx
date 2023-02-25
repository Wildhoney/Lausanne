// @ts-nocheck

import { create, h, use } from "lausanne";

type NameAttrs = {
  value: string;
};

const Name = create<NameAttrs>("x-name", () => {
  return <h1 onClick={(_) => console.log("xx")}>Hello</h1>;
});

export default create("x-app", () => {
  const [name, setName] = use.state("Adam");

  return (
    <section>
      <button onClick={() => setName("Adam")}>Adam</button>
      <button onClick={() => setName("Maria")}>Maria</button>
      <button onClick={() => setName("Imogen")}>Imogen</button>

      <h2>{name}</h2>

      <Name value={name} />

      {/* {typeof document === "undefined" && <Name value={name} />}
      {typeof document !== "undefined" && <x-name />} */}
    </section>
  );
});
