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

  getSize() {
    return this.size;
  }

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

  removeHead() {
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

  removeTail() {
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
    const currentNode = this.head;
    this.head = newNode;
    this.head.next = currentNode;
    this.size++;
  }

  addByIndex(element: T, index: number) {
    const newNode = new Node(element);

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
    if (index === 0) return this.removeHead();
    if (index === this.size - 1) return this.removeTail();
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

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
    if (index === 0 && !addedToHead && !addedByIndex && !removedFromHead) {
      return "head";
    } else if (index === 0 && addedByIndex && +indexValue !== 0) {
      return "head";
    } else {
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
    if (inputValue) {
      setLoading(true);
      setInputValue(inputValue);
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
    if (inputValue) {
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
      list.removeHead();
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
      list.removeTail();
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

  const removeElements = (
    head: Node<number> | null,
    val: number
  ): Node<number> | null => {
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
        <Button
          style={{ minWidth: "175px" }}
          text="Добавить в head"
          onClick={handleAddToHead}
        />
        <Button
          style={{ minWidth: "175px" }}
          text="Добавить в tail"
          onClick={handleAddToTail}
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
