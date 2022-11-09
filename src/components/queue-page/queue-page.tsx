import React, { useState, ChangeEvent } from "react";
import { IQueue, TQueueItem } from "../../types/queue";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/functions";
import styles from "./queue-page.module.css";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  isEmpty = () => this.length === 0;

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = [];
    this.length = 0;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };
}

export const QueuePage: React.FC = () => {
  const defaultQueue = Array.from({ length: 7 }, () => ({
    value: "",
    color: ElementStates.Default,
  }));
  const [arr, setArr] = useState<TQueueItem[]>(defaultQueue);
  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
  const [inputValue, setInputValue] = useState("");
  const [buttons, setDisabledButtons] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = async () => {
    if (inputValue) {
      setInputValue("");
      queue.enqueue({ value: inputValue, color: ElementStates.Default });
      setQueue(queue);

      arr[queue.getTail() - 1] = { value: "", color: ElementStates.Changing };
      setArr([...arr]);

      await delay(500);
      arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Changing };
      setArr([...arr]);

      arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Default };
      setArr([...arr]);
    }
  };

  const handleDeleteNumber = async () => {
    setDisabledButtons(true);
    queue.dequeue();
    setQueue(queue);

    arr[queue.getHead() - 1] = { value: arr[queue.getHead() - 1].value, color: ElementStates.Changing };
    setArr([...arr]);

    await delay(500);
    arr[queue.getHead() - 1] = { value: "", color: ElementStates.Default };
    setArr([...arr]);

    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      arr[queue.getHead() - 1] = { value: "", color: ElementStates.Default, head: "head" };
      setArr([...arr]);
    }

    setDisabledButtons(false);
  };

  const handleClearQueue = () => {
    queue.clear();
    setQueue(queue);
    setArr(defaultQueue);
  };

  return (
    <SolutionLayout title="Очередь">
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
          onClick={handleClearQueue}
          disabled={!arr.length}
        />
      </div>
      <ul className={styles.circles} >
          {arr && arr.slice(0, 7).map((item, index) =>
            <li key={index}>
              <Circle
                letter={item.value}
                index={index}
                state={item.color}
                head={(index === queue.getHead() && !queue.isEmpty()) || item.head ? 'head' : ''}
                tail={(index === queue.getTail() - 1 && !queue.isEmpty()) ? 'tail' : ''} />
            </li>)}
        </ul>
    </SolutionLayout>
  );
};
