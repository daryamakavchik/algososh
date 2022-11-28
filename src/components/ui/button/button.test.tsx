import React from "react";
import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";
import { Direction } from "../../../types/direction";
import * as renderer from "react-test-renderer";

describe("Кнопка рендерится без ошибок", () => {
  it("Кнопка с текстом", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Деактивированная кнопка", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка с загрузкой", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка сортировки по возрастанию", () => {
    const tree = renderer.create(<Button text="По возрастанию"
    sorting={Direction.Ascending} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка сортировки по убыванию", () => {
    const tree = renderer.create(<Button text="По возрастанию"
    sorting={Direction.Descending} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка меньшей ширины", () => {
    const tree = renderer.create(<Button linkedList="small" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка большей ширины", () => {
    const tree = renderer.create(<Button linkedList="big" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка работает при нажатии", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
});
