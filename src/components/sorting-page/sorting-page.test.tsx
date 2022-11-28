import { ElementStates } from "../../types/element-states";
import {
  sortAscendingSelect,
  sortDescendingSelect,
  sortAscendingBubble,
  sortDescendingBubble,
} from "./sorting-page";

const oneElementArray = [{ value: 1, color: ElementStates.Default }];
const multipleElementsArray = [
  { value: 3, color: ElementStates.Modified },
  { value: 0, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 77, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
];

const ascendingFinalArray = [
  { value: 0, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
  { value: 77, color: ElementStates.Modified },
];

const descendingFinalArray = [
  { value: 77, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 0, color: ElementStates.Modified },
];

const setArr = jest.fn();
const setLoader = jest.fn();
jest.setTimeout(10000);

describe("Сортировка массива по возрастанию выбором", () => {
  it("Выполнена корректно с пустым массивом", async () => {
    await sortAscendingSelect([], setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с одним элементом массива", async () => {
    await sortAscendingSelect(oneElementArray, setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с несколькими элементами массива", async () => {
    await sortAscendingSelect(multipleElementsArray, setArr, setLoader);
    expect(setArr).toHaveBeenLastCalledWith(ascendingFinalArray);
  });
});

describe("Сортировка массива по убыванию выбором", () => {
  it("Выполнена корректно с пустым массивом", async () => {
    await sortDescendingSelect([], setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с одним элементом массива", async () => {
    await sortDescendingSelect(oneElementArray, setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с несколькими элементами массива", async () => {
    await sortDescendingSelect(multipleElementsArray, setArr, setLoader);
    expect(setArr).toHaveBeenLastCalledWith(descendingFinalArray);
  });
});

describe("Сортировка массива по возрастанию пузырьком", () => {
  it("Выполнена корректно с пустым массивом", async () => {
    await sortAscendingBubble([], setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с одним элементом массива", async () => {
    await sortAscendingBubble(oneElementArray, setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с несколькими элементами массива", async () => {
    await sortAscendingBubble(multipleElementsArray, setArr, setLoader);
    expect(setArr).toHaveBeenLastCalledWith(ascendingFinalArray);
  });
});

describe("Сортировка массива по убыванию пузырьком", () => {
  it("Выполнена корректно с пустым массивом", async () => {
    await sortDescendingBubble([], setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с одним элементом массива", async () => {
    await sortDescendingBubble(oneElementArray, setArr, setLoader);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Выполнена корректно с несколькими элементами массива", async () => {
    await sortDescendingBubble(multipleElementsArray, setArr, setLoader);
    expect(setArr).toHaveBeenLastCalledWith(descendingFinalArray);
  });
});
