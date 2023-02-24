import { h } from "./index.js";
import { use } from "../use/index.js";

describe("h()", () => {
  it("should be able to parse simple text children", () => {
    expect(<section>Hi Adam</section>).toMatchSnapshot();
  });

  it("should be able to parse text children with interspersed nodes", () => {
    expect(
      <section>
        Hi <strong>Adam</strong>!
      </section>
    ).toMatchSnapshot();
  });

  it("should be able to parse children with state", () => {
    const [name] = use.state("Adam");

    expect(
      <section>
        Hi <strong>{name()}</strong>!
      </section>
    ).toMatchSnapshot();
  });
});
