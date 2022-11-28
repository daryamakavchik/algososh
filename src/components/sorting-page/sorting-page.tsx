import React, { Dispatch, SetStateAction, useState } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/sort";
import { Direction } from "../../types/direction";
import { delay } from "../../utils/functions";
import { createArr } from "./utils";
import { DELAY_SHORT } from "../../utils/constants";
import styles from "./sorting-page.module.css";

export const sortAscendingSelect = async (
  arr: TArray[],
  setArr: Dispatch<SetStateAction<TArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  for (let i = 0; i < arr.length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);

      await delay(DELAY_SHORT);
      if (arr[j].value < arr[minInd].value) {
        minInd = j;
      }
      arr[j].color = ElementStates.Default;
      setArr([...arr]);
    }

    [arr[i].value, arr[minInd].value] = [arr[minInd].value, arr[i].value];
    arr[i].color = ElementStates.Modified;
  }
  arr.length > 0
    ? (arr[arr.length - 1].color = ElementStates.Modified)
    : (arr = arr);
  setLoader(false);
};

export const sortDescendingSelect = async (
  arr: TArray[],
  setArr: Dispatch<SetStateAction<TArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);

      await delay(DELAY_SHORT);
      if (arr[j].value > arr[maxInd].value) {
        maxInd = j;
      }
      arr[j].color = ElementStates.Default;
      setArr([...arr]);
    }

    [arr[i].value, arr[maxInd].value] = [arr[maxInd].value, arr[i].value];
    arr[i].color = ElementStates.Modified;
  }
  arr.length > 0
    ? (arr[arr.length - 1].color = ElementStates.Modified)
    : (arr = arr);
  setLoader(false);
};

export const sortAscendingBubble = async (
  arr: TArray[],
  setArr: Dispatch<SetStateAction<TArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setArr([...arr]);

      await delay(DELAY_SHORT);
      if (arr[j].value > arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].color = ElementStates.Default;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoader(false);
};

export const sortDescendingBubble = async (
  arr: TArray[],
  setArr: Dispatch<SetStateAction<TArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setArr([...arr]);

      await delay(DELAY_SHORT);
      if (arr[j].value < arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].color = ElementStates.Default;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoader(false);
};

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TArray[]>([]);
  const [sortType, setSortType] = useState("выбор");
  const [direction, setDirection] = useState<Direction>();
  const [loader, setLoader] = useState(false);

  const addNewArr = () => {
    setArr([...createArr()]);
  };

  const changeSortType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.value);
  };

  const setLoading = (sorting: Direction) => {
    if (sorting === direction && loader === true) {
      return true;
    }
    return false;
  };

  const setDisabled = (sorting: Direction) => {
    if ((sorting !== direction && loader === true) || arr.length === 0) {
      return true;
    }
    return false;
  };

  const handleClick = (direction: Direction) => {
    setDirection(direction);

    if (sortType === "выбор" && direction === Direction.Ascending) {
      sortAscendingSelect(arr, setArr, setLoader);
    }
    if (sortType === "выбор" && direction === Direction.Descending) {
      sortDescendingSelect(arr, setArr, setLoader);
    }
    if (sortType === "пузырёк" && direction === Direction.Ascending) {
      sortAscendingBubble(arr, setArr, setLoader);
    }
    if (sortType === "пузырёк" && direction === Direction.Descending) {
      sortDescendingBubble(arr, setArr, setLoader);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radios}>
          <RadioInput
            label="Выбор"
            value="выбор"
            checked={sortType === "выбор" ? true : false}
            onChange={changeSortType}
            disabled={loader}
          />
          <RadioInput
            label="Пузырёк"
            value="пузырёк"
            checked={sortType === "пузырёк" ? true : false}
            onChange={changeSortType}
            disabled={loader}
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => handleClick(Direction.Ascending)}
              disabled={setDisabled(Direction.Ascending)}
              isLoader={setLoading(Direction.Ascending)}
            />
          </div>
          <div className={styles.button}>
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => handleClick(Direction.Descending)}
              disabled={setDisabled(Direction.Descending)}
              isLoader={setLoading(Direction.Descending)}
            />
          </div>
        </div>
        <div className={styles.arrbutton}>
          <Button text="Новый массив" onClick={addNewArr} disabled={loader} />
        </div>
      </div>
      <ul className={styles.columns}>
        {arr &&
          arr.map((item, index) => (
            <li key={index} className={styles.column}>
              <Column index={+item.value} state={item.color} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
