import { create, h, use } from "lausanne";

const [name, setName] = use.state("Adam");

if (typeof window !== "undefined") {
  (window as any).setName = setName;
}

export default create("x-name", () => {
  return (
    <x-name>
      <h1>Hello {name()}!</h1>

      {/* <button onClick={() => setName("Adam")}>Adam</button>
      <button onClick={() => setName("Maria")}>Maria</button>
      <button onClick={() => setName("Imogen")}>Imogen</button> */}
    </x-name>
  );

  // return (
  //   [
  //     <div>
  //     <h1>Hello {"Adam"}!</h1> <h5>from Horsham, West Sussex</h5>
  //     <p>welcome to the website {":)"}</p>
  //   </div>,
  //   <h1>Test</h1>
  //   ]
  // );
});

// export default create("x-name", () => {
//   return (
//     <section>
//       <h1 onClick={console.log}>Hello {name}!</h1>
//       <input type="text" onInput={(event) => console.log(event.target.value)} />

//       {/* <button onClick={() => setName("Adam")}>Adam</button> */}
//       <button onClick={() => setName("Maria")}>Maria</button>
//       {/* <button onClick={() => setName("Imogen")}>Imogen</button> */}
//     </section>
//   );
// });

// if (typeof document !== "undefined") {
//   const element = document.createElement("div");

//   solid.createEffect(() => {
//     element.setAttribute("name", name());
//     element.innerHTML = name();
//   });

//   document.querySelector("div#app").appendChild(element);
// }

// if (typeof window !== "undefined") {
//   (window as any).setName = setName;
// }
