import React, { useState, ChangeEvent } from "react";
import { TStackItem } from "../../types/stack";
import { Stack } from "./stack-page-class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/functions";
import { DELAY_SHORT, MAX_STACK_INPUT_LENGTH } from "../../utils/constants";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [arr, setArr] = useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [stack] = useState(new Stack<TStackItem>());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setArr([...stack.getElements()]);
      await delay(DELAY_SHORT);
      stack.peek().color = ElementStates.Default;
      setArr([...stack.getElements()]);
    }
  };

  const handleDeleteNumber = async () => {
    stack.peek().color = ElementStates.Changing;
    setArr([...stack.getElements()]);
    await delay(DELAY_SHORT);
    stack.pop();
    setArr([...stack.getElements()]);
  };

  const handleClearStack = () => {
    stack.clear();
    setArr([...stack.getElements()]);
  };

  const addIndex = (index: number, arr: TStackItem[]): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          maxLength={MAX_STACK_INPUT_LENGTH}
          isLimitText={true}
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        <Button
          data-testid="addbutton"
          text="Добавить"
          onClick={handleAddNumber}
          disabled={inputValue === ""}
        />
        <Button
          data-testid="deletebutton"
          text="Удалить"
          onClick={handleDeleteNumber}
          disabled={!arr.length}
        />
        <Button
          data-testid="clearbutton"
          text="Очистить"
          onClick={handleClearStack}
          disabled={!arr.length}
        />
      </div>
      <ul className={styles.circles} data-testid="circles">
        {arr &&
          arr.map((item, index) => (
            <li key={index}>
              <Circle
                data-testid="circle"
                letter={item.value}
                state={item.color}
                index={index}
                head={addIndex(index, arr)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
