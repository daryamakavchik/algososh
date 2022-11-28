import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TArray } from "../../types/string";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/functions";
import { swap } from "./utils";
import { DELAY_LONG } from "../../utils/constants";
import styles from "./string.module.css";

export const reverse = async (
  arr: TArray[],
  setInputArr: Dispatch<SetStateAction<TArray[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  setLoader(true);
  const mid = Math.ceil(arr.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = arr.length - 1 - i;

    if (i !== j) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setInputArr([...arr]);
      await delay(DELAY_LONG);
    }

    swap(arr, i, j);

    arr[i].color = ElementStates.Modified;
    arr[j].color = ElementStates.Modified;

    setInputArr([...arr]);
  }
  setLoader(false);
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputArr, setInputArr] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleReverse = () => {
    const newArr = inputValue
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverse(newArr, setInputArr, setLoader);
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
              type="submit"
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
                <Circle
                  letter={item.value}
                  state={item.color}
                  extraClass="circle"
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
