import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay, countFibonacci } from "../../utils/functions";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputArr, setInputArr] = useState<Array<number>>([]);
  const [loader, setLoader] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const getFibonacciNumbers = async (n: string) => {
    const arr = countFibonacci(+inputValue);
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      await delay(500);
      setInputArr(arr.slice(0, i + 1));
    }
    setLoader(false);
  }

  const handleDisplay = () => {
    getFibonacciNumbers(inputValue);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <div className={styles.container}>
        <div className={styles.inputcontainer}>
          <Input
            type="number"
            value={inputValue}
            isLimitText={true}
            max={19}
            min={1}
            onChange={onInputChange}
          />
          <div className={styles.button}>
            <Button
              text="Рассчитать"
              isLoader={loader}
              disabled={inputValue === "" ? true : false}
              onClick={handleDisplay}
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
}
