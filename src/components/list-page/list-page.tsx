import React, { useState, ChangeEvent, useMemo } from "react";
import { TListItem, ILinkedList } from "../../types/list";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private addValues(values: T[]) { values.forEach((value) => this.append(value))}
  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements?.length) { this.addValues(elements) }
  }

  getSize() { return this.size }

  toArray() {
    let curr = this.head;
    const res = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res];
  }

  append(element: T) {
    let node = new Node(element);
    if (this.size === 0) {
      this.head = node;
    } else {
      let current = this.head;
      while (current && current.next !== null) {
        current = current.next;
      }
      if (current) current.next = new Node(element);
    }
    this.size++;
  }

  prepend(element: T) {
    const newNode = new Node(element);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return this;
    }

    const currenNode = this.head;
    this.head = newNode;
    this.head.next = currenNode;
    this.size++;
  }
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");

  const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const list = useMemo(
    () =>
      new LinkedList<string>(
        Array.from({ length: 4 }, () => getRandomNum(0, 99).toString())
      ),
    []
  );

  const [arr, setArr] = useState<TListItem[]>( list.toArray().map((item) => ({ value: item, color: ElementStates.Default })));
  const [addedToHead, setAddedToHead] = useState(false);
  const [removedFromHead, setRemovedFromHead] = useState(false);
  const [addedByIndex, setAddedByIndex] = useState(false);
  const [removedByIndex, setRemovedByIndex] = useState(false);
  const [addedToTail, setAddedToTail] = useState(false);
  const [removedFromTail, setRemovedFromTail] = useState(false);
  const [loading, setLoading] = useState(false);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const displayHead = (index: number) => {
    if (index === 0 && !addedToHead && !addedByIndex) {
      return "head";
    } else if (index === 0 && addedByIndex && +indexValue !== 0) {
      return "head";
    } else {
      return "";
    }
  };

  const displayTail = (index: number) => {
    if (index === arr.length - 1 && !removedFromTail && !removedByIndex) {
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
    if (inputValue) {
      setLoading(true);
      setInputValue('');
      setAddedToHead(true);
      await delay(500);
      list.prepend(inputValue);
      setAddedToHead(false);
      const newArr = list.toArray().map((item) => ({ value: item, color: ElementStates.Default }));
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);
      await delay(500);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    };
    setInputValue('');
    setLoading(false);
  };


  const handleAddToTail = async () => {};

  const handleRemoveFromHead = async () => {};

  const handleRemoveFromTail = async () => {};

  const handleAddByIndex = async () => {};

  const handleRemoveByIndex = async () => {};

  const removeElements = ( head: Node<number> | null, val: number): Node<number> | null => {
    if (head === null) {
      return null;
    }

    let dummyHead = new Node(0);
    dummyHead.next = head;
    head = dummyHead;

    while (dummyHead.next !== null) {
      if (dummyHead.next.value === val) {
        dummyHead.next = dummyHead.next.next;
      } else {
        dummyHead = dummyHead.next;
      }
    }

    return head.next;
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
        <Button style={{ minWidth: "175px" }} text="Добавить в head" onClick={handleAddToHead} />
        <Button style={{ minWidth: "175px" }} text="Добавить в tail" />
        <Button style={{ minWidth: "175px" }} text="Удалить из head" />
        <Button style={{ minWidth: "175px" }} text="Удалить из tail" />
      </div>
      <div className={styles.container}>
        <Input
          style={{ maxWidth: "204px" }}
          placeholder="Введите индекс"
          type="text"
          value={indexValue}
          onChange={onIndexChange}
        />
        <Button style={{ minWidth: "362px" }} text="Добавить по индексу" />
        <Button style={{ minWidth: "362px" }} text="Удалить по индексу" />
      </div>
      <ul className={styles.circles}>
        {arr &&
          arr.map((item, index) => (
            <li key={index} className={styles.circlebox}>
            {loading === true && index === +inputValue &&
                <div className={styles.smallcircle}>
                  <Circle isSmall state={ElementStates.Changing} />
                </div>}
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
