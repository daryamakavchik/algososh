import React, { useState, ChangeEvent, useMemo } from "react";
import { TListItem, ILinkedList } from "../../types/list";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay, getRandomNumber } from "../../utils/functions";
import styles from "./list-page.module.css";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  private addValues(values: T[]) {
    values.forEach((value) => this.append(value));
  }

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements?.length) {
      this.addValues(elements);
    }
  }

  getSize() { return this.size }

  getCurr(index: number) {
    if (index < 0 || index >= this.size) return null;
    let counter = 0;
    let curr = this.head;
    while (counter !== index && curr) {
      curr = curr?.next;
      counter++;
    }
    return curr;
  }

  toArray() {
    let curr = this.head;
    const res = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res];
  }

  deleteHead() {
    if (!this.head) return null;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    const currentHead = this.head;
    const newHead = currentHead.next;
    this.head = newHead;
    this.size--;
  }

  deleteTail() {
    if (this.head == null) return null;

    if (this.head.next == null) {
      return null;
    }

    var second_last = this.head;
    while (
      second_last !== null &&
      second_last.next !== null &&
      second_last.next.next != null
    )
      second_last = second_last.next;
    second_last.next = null;

    return this.head;
  }

  append(element: T) {
    let node = new LinkedListNode(element);
    if (this.size === 0) {
      this.head = node;
    } else {
      let current = this.head;
      while (current && current.next !== null) {
        current = current.next;
      }
      if (current) current.next = new LinkedListNode(element);
    }
    this.size++;
  }

  prepend(element: T) {
    const newNode = new LinkedListNode(element);
    const currentNode = this.head;
    this.head = newNode;
    this.head.next = currentNode;
    this.size++;
  }

  addByIndex(element: T, index: number) {
    const newNode = new LinkedListNode(element);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
    }

    let prev = this.getCurr(index - 1);
    if (prev?.next) {
      let temp = prev?.next;
      prev!.next = newNode;
      newNode!.next = temp;
      this.size++;
    }
    return;
  }

  removeByIndex(index: number) {
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();
    let prev = this.getCurr(index - 1);
    if (prev?.next) {
      let deletedNode = prev?.next;
      prev.next = deletedNode?.next;
      this.size--;
      return deletedNode;
    }
  }
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [circleValue, setCircleValue] = useState("");

  const list = useMemo(
    () =>
      new LinkedList<string>(
        Array.from({ length: 4 }, () => getRandomNumber(0, 99).toString())
      ),
    []
  );

  const [arr, setArr] = useState<TListItem[]>(
    list
      .toArray()
      .map((item) => ({ value: item, color: ElementStates.Default }))
  );

  const [addedToHead, setAddedToHead] = useState(false);
  const [removedFromHead, setRemovedFromHead] = useState(false);
  const [addedByIndex, setAddedByIndex] = useState(false);
  const [removedByIndex, setRemovedByIndex] = useState(false);
  const [addedToTail, setAddedToTail] = useState(false);
  const [removedFromTail, setRemovedFromTail] = useState(false);
  const [indexOfInputValue, setIndexOfInputValue] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [buttons, setDisabledButtons] = useState(false);
  const [indexButtons, setDisabledIndexButtons] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const displayHead = (index: number) => {
    if (index === 0 && !addedToHead && !addedByIndex) {
      return "head";
    }
    if (circleValue || addedByIndex) {
      return "";
    }
  };

  const displayTail = (index: number) => {
    if (
      index === arr.length - 1 &&
      !removedFromTail &&
      !removedByIndex &&
      !addedToTail
    ) {
      return "tail";
    } else if (arr.length === 1) {
      return "";
    } else if (removedByIndex && index === arr.length - 1) {
      return "";
    } else {
      return "";
    }
  };

  const handleAddToHead = async () => {
    if (list.getSize() > 5) {
      setDisabledButtons(true);
    }
    if (inputValue && list.getSize() <= 5) {
      setLoading(true);
      setIndexOfInputValue(0);
      setAddedToHead(true);

      await delay(500);
      list.prepend(inputValue);
      setAddedToHead(false);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);

      await delay(500);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
  };

  const handleAddToTail = async () => {
    if (list.getSize() > 5) {
      setDisabledButtons(true);
    }
    if (inputValue && list.getSize() <= 5) {
      setLoading(true);
      setInputValue(inputValue);
      setIndexOfInputValue(list.getSize() - 1);
      setAddedToTail(true);

      await delay(500);
      list.append(inputValue);
      setAddedToTail(false);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);

      await delay(500);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
  };

  const handleRemoveFromHead = async () => {
    if (list.getSize() > 0) {
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      setCircleValue(newArr[0].value);
      setLoading(true);
      setRemovedFromHead(true);
      setIndexOfInputValue(0);
      newArr[0].value = "";
      setArr(newArr);

      await delay(500);
      list.deleteHead();
      setRemovedFromHead(false);
      setArr(
        list
          .toArray()
          .map((item) => ({ value: item, color: ElementStates.Default }))
      );
    }
    setLoading(false);
  };

  const handleRemoveFromTail = async () => {
    if (list.getSize() > 0) {
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      setCircleValue(newArr[newArr.length - 1].value);
      setLoading(true);
      setRemovedFromTail(true);
      setIndexOfInputValue(list.getSize() - 1);
      newArr[newArr.length - 1].value = "";
      setArr(newArr);

      await delay(500);
      list.deleteTail();
      setRemovedFromTail(false);
      setArr(
        list
          .toArray()
          .map((item) => ({ value: item, color: ElementStates.Default }))
      );
    }
    setLoading(false);
  };

  const handleAddByIndex = async () => {
    if (list.getSize() >= 6) {
      setDisabledIndexButtons(true);
    }
    if (+indexValue < 5 && list.getSize() < 6) {
      setLoading(true);
      setAddedByIndex(true);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      for (let i = 0; i <= +indexValue; i++) {
        setIndexOfInputValue(i);

        await delay(500);
        if (i < +indexValue) {
          newArr[i].color = ElementStates.Changing;
          setArr(newArr);
        }
      }
      setAddedByIndex(false);
      setIndexOfInputValue(+"");
      list.addByIndex(inputValue, +indexValue);
      const finalArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      finalArr[+indexValue].color = ElementStates.Modified;

      setArr(finalArr);

      await delay(500);
      finalArr[+indexValue].color = ElementStates.Default;
      setArr(finalArr);
    }
    setLoading(false);
    setInputValue("");
    setIndexValue("");
  };

  const handleRemoveByIndex = async () => {
    if (+indexValue < list.getSize() && +indexValue < 7) {
      setLoading(true);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      for (let i = 0; i <= +indexValue; i++) {
        await delay(500);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      }

      await delay(500);
      setCircleValue(newArr[+indexValue].value);
      newArr[+indexValue].value = "";
      setRemovedByIndex(true);
      newArr[+indexValue].color = ElementStates.Default;
      setIndexOfInputValue(+indexValue);
      
      await delay(500);
      list.removeByIndex(+indexValue);
      setArr(
        list
          .toArray()
          .map((item) => ({ value: item, color: ElementStates.Default }))
      );
      setRemovedByIndex(false);
      setLoading(false);
      setIndexValue("");
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          style={{ maxWidth: "204px" }}
          placeholder="Введите значение"
          maxLength={4}
          isLimitText={true}
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
        <Button
          style={{ minWidth: "175px" }}
          text="Добавить в head"
          onClick={handleAddToHead}
          disabled={buttons}
        />
        <Button
          style={{ minWidth: "175px" }}
          text="Добавить в tail"
          onClick={handleAddToTail}
          disabled={buttons}
        />
        <Button
          style={{ minWidth: "175px" }}
          text="Удалить из head"
          onClick={handleRemoveFromHead}
        />
        <Button
          style={{ minWidth: "175px" }}
          text="Удалить из tail"
          onClick={handleRemoveFromTail}
        />
      </div>
      <div className={styles.container}>
        <Input
          style={{ maxWidth: "204px" }}
          placeholder="Введите индекс"
          type="text"
          value={indexValue}
          onChange={onIndexChange}
        />
        <Button
          style={{ minWidth: "362px" }}
          text="Добавить по индексу"
          onClick={handleAddByIndex}
          disabled={indexButtons}
        />
        <Button
          style={{ minWidth: "362px" }}
          text="Удалить по индексу"
          onClick={handleRemoveByIndex}
        />
      </div>
      <ul className={styles.circles}>
        {arr &&
          arr.map((item, index) => (
            <li key={index} className={styles.circlebox}>
              {loading === true &&
                (addedToHead === true ||
                  addedToTail === true ||
                  addedByIndex === true) &&
                index === indexOfInputValue && (
                  <div className={styles.smalltopcircle}>
                    <Circle
                      isSmall
                      letter={inputValue}
                      state={ElementStates.Changing}
                    />
                  </div>
                )}
              {loading === true &&
                (removedFromTail === true ||
                  removedFromHead === true ||
                  removedByIndex === true) &&
                index === indexOfInputValue && (
                  <div className={styles.smallbottomcircle}>
                    <Circle
                      isSmall
                      letter={circleValue}
                      state={ElementStates.Changing}
                    />
                  </div>
                )}
              <div className={styles.bigcircle}>
                <Circle
                  letter={item.value}
                  state={item.color}
                  index={index}
                  head={displayHead(index)}
                  tail={displayTail(index)}
                />
              </div>
              {index !== arr.length - 1 && (
                <div className={styles.arrow}>
                  <ArrowIcon />
                </div>
              )}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
