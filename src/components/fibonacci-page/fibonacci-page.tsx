import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/functions";
import { getFibonacciNumbers } from "./utils";
import { DELAY_SHORT, MAX_NUM_FIB, MIN_NUM_FIB } from "../../utils/constants";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputArr, setInputArr] = useState<Array<number>>([]);
  const [loader, setLoader] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const countFibonacci = async (n: string) => {
    const arr = getFibonacciNumbers(+inputValue);
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      await delay(DELAY_SHORT);
      setInputArr(arr.slice(0, i + 1));
    }
    setLoader(false);
  };

  const handleCountButton = () => {
    countFibonacci(inputValue);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <div className={styles.inputcontainer}>
          <Input
            type="number"
            value={inputValue}
            isLimitText={true}
            max={MAX_NUM_FIB}
            min={MIN_NUM_FIB}
            onChange={onInputChange}
          />
          <div className={styles.button}>
            <Button
              type="submit"
              text="Рассчитать"
              isLoader={loader}
              disabled={
                inputValue === "" || +inputValue > 19 || +inputValue < 0
                  ? true
                  : false
              }
              onClick={handleCountButton}
            />
          </div>
        </div>
        <ul className={styles.circlecontainer}>
          {inputArr &&
            inputArr.map((item, index) => (
              <li key={index}>
                <Circle index={index} letter={item.toString()} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
