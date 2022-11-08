import React, { useState, ChangeEvent } from "react";
import { TStackItem, IStack } from "../../types/stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peek = (): T => {
      return this.container[this.container.length - 1];
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
  getElements = () => this.container;
}

export const StackPage: React.FC = () => {
  const [arr, setArr] = useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [stack] = useState(new Stack<TStackItem>());

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setArr([...stack.getElements()]);
      await delay(500);
      stack.peek().color = ElementStates.Default;
      setArr([...stack.getElements()]);
    }
  };

  const handleDeleteNumber = async () => {
    stack.peek().color = ElementStates.Changing;
    setArr([...stack.getElements()]);
    await delay(500);
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
          maxLength={4}
          isLimitText={true}
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Добавить"
          onClick={handleAddNumber}
          disabled={inputValue === ""}
        />
        <Button
          text="Удалить"
          onClick={handleDeleteNumber}
          disabled={!arr.length}
        />
        <Button
          text="Очистить"
          onClick={handleClearStack}
          disabled={!arr.length}
        />
      </div>
      <ul className={styles.circles}>
        {arr &&
          arr.map((item, index) => (
            <li key={index}>
              <Circle
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
