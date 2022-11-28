import React from "react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import * as renderer from "react-test-renderer";

describe("Круг рендерится без ошибок", () => {
  it("Круг без текста", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с буквами", () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с head", () => {
    const tree = renderer.create(<Circle head="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с React-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с React-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с tail", () => {
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с index", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг isSmall", () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
