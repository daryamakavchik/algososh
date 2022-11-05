import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { TArray } from "../../types/string";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputArr, setInputArr] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const swap = (arr: TArray[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  };

  const reverse = async (arr: TArray[]) => {
    setLoader(true);
    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setInputArr([...arr]);
      }

      swap(arr, i, j);

      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;

      setInputArr([...arr]);
    }
    setLoader(false);
  };

  const handleReverse = () => {
    const newArr = inputValue
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverse(newArr);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.inputcontainer}>
          <Input
            value={inputValue}
            isLimitText={true}
            maxLength={11}
            onChange={onInputChange}
          />
          <div className={styles.button}>
            <Button
              text="Развернуть"
              isLoader={loader}
              disabled={inputValue === "" ? true : false}
              onClick={handleReverse}
            />
          </div>
        </div>
        <ul className={styles.circlecontainer}>
          {inputArr &&
            inputArr.map((item, index) => (
              <li key={index}>
                <Circle letter={item.value} state={item.color} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
