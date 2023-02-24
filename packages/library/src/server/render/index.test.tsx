import { h } from "../../global/h/index.js";
import { render } from "./index.js";
import { use } from "../../global/use/index.js";

describe("render()", () => {
  it("should be able to render a simple tree", () => {
    expect(render(<section>Hi Adam</section>)).toMatchInlineSnapshot(
      `"<section>Hi Adam</section>"`
    );
  });

  it("should be render a tree with interspersed nodes", () => {
    expect(
      render(
        <section>
          Hi <strong>Adam</strong>!
        </section>
      )
    ).toMatchInlineSnapshot(`"<section>Hi <strong>Adam</strong>!</section>"`);
  });

  it("should be render a tree with node attributes", () => {
    expect(
      render(
        <section data-name="Adam" data-language="en-GB">
          Hi Adam!
        </section>
      )
    ).toMatchInlineSnapshot(
      `"<section data-name="Adam" data-language="en-GB">Hi Adam!</section>"`
    );
  });

  it("should be render a tree with ignored event listeners", () => {
    expect(
      render(
        <section data-name="Adam" onClick={console.log}>
          Hi Adam!
        </section>
      )
    ).toMatchInlineSnapshot(`"<section data-name="Adam">Hi Adam!</section>"`);
  });

  it.only("should be render a children with state", () => {
    const [name] = use.state("Adam");

    expect(
      render(
        <section>
          Hi <strong>{name()}</strong>!
        </section>
      )
    ).toMatchInlineSnapshot(`"<section>Hi <strong>Adam</strong>!</section>"`);
  });
});
