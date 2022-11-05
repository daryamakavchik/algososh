import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TArray } from "../../types/string";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputArr, setInputArr] = useState<Array<number>>([]);
  const [loader, setLoader] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const displayfib = async (n: string) => {
    const arr = countfib(Number(inputValue));
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      setInputArr(arr.slice(0, i + 1));
    }
    setLoader(false);
  }

  const countfib = (n:number):number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < +n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
      setInputArr([...arr]);
    }
    return arr;
  }

  const handleDisplay = () => {
    displayfib(inputValue);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
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
                <Circle letter={item.toString()} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
}
