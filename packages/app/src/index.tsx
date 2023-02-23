import { create, h } from "lausanne";

// const Location = create('x-location', () => {
//   return <h2 onDblClick={console.log}>Horsham, West Sussex</h2>
// }) as any;

export default create("x-name", (attrs) => {
  const name = "Adam";

  return (
    <section>
      <h1 onClick={console.log}>Hello {name}!</h1>
      <input type="text" onInput={(event) => console.log(event.target.value)} />
      {/* <Location /> */}
    </section>
  );
});
