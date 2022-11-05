import React, { useState } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/sort";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TArray[]>([]);
  const [sortType, setSortType] = useState("выбор");
  const [direction, setDirection] = useState<Direction>();
  const [loader, setLoader] = useState(false);
  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const sortAscendingSelect = async (arr: TArray[]) => {
    setLoader(true);
    
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;

        setArr([...arr]);
        await delay(500);
        if (arr[j].value < arr[minInd].value) {
          minInd = j;
        }

        arr[j].color = ElementStates.Default;

        setArr([...arr]);
      }

      [arr[i].value, arr[minInd].value] = [arr[minInd].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setLoader(false);
  };

  const sortDescendingSelect = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;

        setArr([...arr]);

        await delay(500);
        if (arr[j].value > arr[maxInd].value) {
          maxInd = j;
        }

        arr[j].color = ElementStates.Default;

        setArr([...arr]);
      }

      [arr[i].value, arr[maxInd].value] = [arr[maxInd].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setLoader(false);
  };

  const sortAscendingBubble = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;

        setArr([...arr]);

        await delay(500);
        if (arr[j].value > arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        }

        arr[j].color = ElementStates.Default;
      }

      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setLoader(false);
  };

  const sortDescendingBubble = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;

        setArr([...arr]);

        await delay(500);
        if (arr[j].value < arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        }

        arr[j].color = ElementStates.Default;
      }

      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setLoader(false);
  };

  const handleClick = (direction: Direction) => {
    setDirection(direction);

    if (sortType === "выбор" && direction === Direction.Ascending) {
      sortAscendingSelect(arr);
    }
    if (sortType === "выбор" && direction === Direction.Descending) {
      sortDescendingSelect(arr);
    }
    if (sortType === "пузырёк" && direction === Direction.Ascending) {
      sortAscendingBubble(arr);
    }
    if (sortType === "пузырёк" && direction === Direction.Descending) {
      sortDescendingBubble(arr);
    }
  };

  const changeSortType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.value);
  };

  const createArr = () => {
    const arr = [];
    const length = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    for (let i = 0; i < length; i++) {
      arr.push({
        value: Math.round(Math.random() * 100),
        color: ElementStates.Default,
      });
    }
    return arr;
  };

  const addNewArr = () => {
    setArr([...createArr()]);
  };

  const setLoading = (sorting: Direction) => {
    if (sorting === direction && loader === true) {
      return true;
    } else {
      return false;
    }
  };

  const setDisabled = (sorting: Direction) => {
    if (sorting !== direction && loader === true || arr.length === 0) {
      return true;
    } else {
      return false;
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
          <Button
            style={{ width: "205px" }}
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleClick(Direction.Ascending)}
            disabled={setDisabled(Direction.Ascending)}
            isLoader={setLoading(Direction.Ascending)}
          />
          <Button
            style={{ width: "205px" }}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleClick(Direction.Descending)}
            disabled={setDisabled(Direction.Descending)}
            isLoader={setLoading(Direction.Descending)}
          />
        </div>
        <div className={styles.arrbutton}>
          <Button
            style={{ width: "205px" }}
            text="Новый массив"
            onClick={addNewArr}
            disabled={loader}
          />
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
