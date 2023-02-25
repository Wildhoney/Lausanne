import { create, h, use } from "lausanne";

export default create<{}>("x-name", () => {
  const [name, setName] = use.state("Adam");

  return (
    <section>
      <h1>Hello {name}!</h1>

      <button onClick={() => setName("Adam")}>Adam</button>
      <button onClick={() => setName("Maria")}>Maria</button>
      <button onClick={() => setName("Imogen")}>Imogen</button>
    </section>
  );
});
