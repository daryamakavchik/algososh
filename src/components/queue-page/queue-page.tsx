import React, { useState, ChangeEvent } from "react";
import { TQueueItem } from "../../types/queue";
import { Queue } from "./queue-page-class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/functions";
import { DELAY_SHORT } from "../../utils/constants";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const defaultQueue = Array.from({ length: 7 }, () => ({
    value: "",
    color: ElementStates.Default,
  }));
  const [arr, setArr] = useState<TQueueItem[]>(defaultQueue);
  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
  const [inputValue, setInputValue] = useState("");
  const [buttons, setDisabledButtons] = useState(false);
  const [addedToQueue, setAddedToQueue] = useState(false);
  const [removedFromQueue, setRemovedFromQueue] = useState(false);
  const [clearedQueue, setClearedQueue] = useState(false);
  const [loader, setLoader] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = async () => {
    if (inputValue && !queue.isFull()) {
      setLoader(true);
      setAddedToQueue(true);
      setInputValue("");
      queue.enqueue({ value: inputValue, color: ElementStates.Default });
      setQueue(queue);

      arr[queue.getTail() - 1] = { value: "", color: ElementStates.Changing };
      setArr([...arr]);

      await delay(DELAY_SHORT);
      arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Changing };
      setArr([...arr]);

      arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Default };
      setArr([...arr]);
    }
    setLoader(false);
    setAddedToQueue(false);
  };

  const handleDeleteNumber = async () => {
    setDisabledButtons(true);
    setLoader(true);
    setRemovedFromQueue(true);
    queue.dequeue();
    setQueue(queue);

    arr[queue.getHead() - 1] = { value: arr[queue.getHead() - 1].value, color: ElementStates.Changing };
    setArr([...arr]);

    await delay(DELAY_SHORT);
    arr[queue.getHead() - 1] = { value: "", color: ElementStates.Default };
    setArr([...arr]);

    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      arr[queue.getHead() - 1] = { value: "", color: ElementStates.Default, head: "head" };
      setArr([...arr]);
    }

    setDisabledButtons(false);
    setLoader(false);
    setRemovedFromQueue(false);
  };

  const handleClearQueue = () => {
    setClearedQueue(true);
    queue.clear();
    setQueue(queue);
    setArr(defaultQueue);
    setClearedQueue(false);
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
          disabled={inputValue === "" || queue.isFull() || removedFromQueue}
          isLoader={addedToQueue}
        />
        <Button
          text="Удалить"
          onClick={handleDeleteNumber}
          disabled={!arr.length || queue.isEmpty() || addedToQueue}
          isLoader={removedFromQueue}
        />
        <Button
          text="Очистить"
          onClick={handleClearQueue}
          disabled={!arr.length || queue.isEmpty() || addedToQueue || removedFromQueue}
          isLoader={clearedQueue}
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
