import { create, h } from "lausanne";

export default create("x-name", () => {
  return (
    <section>
      <h1 onClick={console.log}>Hello Adam!</h1>
      <input type="text" onInput={(event) => console.log(event.target.value)} />
    </section>
  );
});
