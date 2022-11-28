import React, { useState, ChangeEvent, useMemo, useEffect } from "react";
import { TListItem } from "../../types/list";
import { LinkedList } from "./list-page-class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay, getRandomNumber } from "../../utils/functions";
import {
  DELAY_SHORT,
  INITIAL_LIST_LENGTH,
  MAX_LIST_INPUT_LENGTH,
  MAX_LIST_SIZE,
} from "../../utils/constants";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [circleValue, setCircleValue] = useState("");

  const list = useMemo(
    () =>
      new LinkedList<string>(
        Array.from({ length: INITIAL_LIST_LENGTH }, () =>
          getRandomNumber(0, 99).toString()
        )
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
  const [indexAddButton, setDisabledIndexAddButton] = useState(false);
  const [indexDeleteButton, setDisabledIndexDeleteButton] = useState(false);

  const displayTailConditions = !removedFromTail && !removedByIndex;
  const displayHeadConditions = !addedToHead && !addedByIndex;

  const disableAddHeadButtonCondition =
    addedToTail ||
    addedByIndex ||
    removedFromTail ||
    removedFromHead ||
    removedByIndex;
  const disableAddTailButtonCondition =
    addedToHead ||
    addedByIndex ||
    removedFromTail ||
    removedFromHead ||
    removedByIndex;
  const disableRemoveHeadButtonCondition =
    addedToHead ||
    addedToTail ||
    addedByIndex ||
    removedFromTail ||
    removedByIndex;
  const disableRemoveTailButtonCondition =
    addedToTail ||
    addedToHead ||
    addedByIndex ||
    removedFromHead ||
    removedByIndex;
  const disableAddIndexButtonCondition =
    addedToTail || addedToHead || removedFromTail || removedByIndex;
  const disableRemoveIndexButtonCondition =
    addedToTail || addedToHead || addedByIndex || removedFromTail;

  useEffect(() => {
    indexValue && inputValue && +indexValue <= list.getSize() - 1
      ? setDisabledIndexAddButton(false)
      : setDisabledIndexAddButton(true);

    (indexValue && +indexValue <= list.getSize() - 1) ||
    (indexValue && +indexValue < arr.length - 1)
      ? setDisabledIndexDeleteButton(false)
      : setDisabledIndexDeleteButton(true);

    list.getSize() >= MAX_LIST_SIZE || !inputValue
      ? setDisabledButtons(true)
      : setDisabledButtons(false);
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const displayHead = (index: number) => {
    if (index === 0 && displayHeadConditions) {
      return "head";
    }
    if (circleValue || addedByIndex) {
      return "";
    }
  };

  const displayTail = (index: number) => {
    if (index === arr.length - 1 && displayTailConditions) {
      return "tail";
    }
    if (arr.length === 1) {
      return "";
    }
    if (removedByIndex && index === arr.length - 1) {
      return "";
    }
    return "";
  };

  const handleAddToHead = async () => {
    if (list.getSize() >= MAX_LIST_SIZE - 1) {
      setDisabledButtons(true);
    }
    if (inputValue) {
      setLoading(true);
      setIndexOfInputValue(0);
      setAddedToHead(true);

      await delay(DELAY_SHORT);
      list.prepend(inputValue);
      setAddedToHead(false);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);

      await delay(DELAY_SHORT);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
  };

  const handleAddToTail = async () => {
    if (list.getSize() >= MAX_LIST_SIZE - 1) {
      setDisabledButtons(true);
    }
    if (inputValue) {
      setLoading(true);
      setIndexOfInputValue(list.getSize() - 1);
      setAddedToTail(true);

      await delay(DELAY_SHORT);
      list.append(inputValue);
      setAddedToTail(false);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);

      await delay(DELAY_SHORT);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
  };

  const handleRemoveFromHead = async () => {
    if (list.getSize() > 0) {
      const newArr: Array<any> = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      setCircleValue(newArr[0].value);
      setLoading(true);
      setRemovedFromHead(true);
      setIndexOfInputValue(0);
      newArr[0].value = "";
      setArr(newArr);

      await delay(DELAY_SHORT);
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
      const newArr: Array<any> = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      setCircleValue(newArr[newArr.length - 1].value);
      setLoading(true);
      setRemovedFromTail(true);
      setIndexOfInputValue(newArr.length - 1);
      newArr[newArr.length - 1].value = "";
      setArr(newArr);

      await delay(DELAY_SHORT);
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
    if (list.getSize() >= MAX_LIST_SIZE - 1) {
      setDisabledIndexAddButton(true);
    }
    if (+indexValue) {
      setLoading(true);
      setAddedByIndex(true);
      const newArr = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      for (let i = 0; i <= +indexValue; i++) {
        setIndexOfInputValue(i);

        await delay(DELAY_SHORT);
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

      await delay(DELAY_SHORT);
      finalArr[+indexValue].color = ElementStates.Default;
      setArr(finalArr);
    }
    setLoading(false);
    setInputValue("");
    setIndexValue("");
  };

  const handleRemoveByIndex = async () => {
    if (+indexValue < list.getSize()) {
      setLoading(true);
      setRemovedByIndex(true);
      const newArr: Array<any> = list
        .toArray()
        .map((item) => ({ value: item, color: ElementStates.Default }));
      for (let i = 0; i <= +indexValue; i++) {
        await delay(DELAY_SHORT);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      }

      await delay(DELAY_SHORT);
      setCircleValue(newArr[+indexValue].value);
      newArr[+indexValue].value = "";
      setRemovedByIndex(true);
      newArr[+indexValue].color = ElementStates.Default;
      setIndexOfInputValue(+indexValue);

      await delay(DELAY_SHORT);
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
        <div className={styles.inputcontainer}>
          <Input
            data-testid="input"
            placeholder="Введите значение"
            maxLength={MAX_LIST_INPUT_LENGTH}
            isLimitText={true}
            type="text"
            value={inputValue}
            onChange={onInputChange}
          />
        </div>
        <Button
          data-testid="addtoheadbutton"
          extraClass={styles.button}
          text="Добавить в head"
          onClick={handleAddToHead}
          disabled={buttons || disableAddHeadButtonCondition}
          isLoader={addedToHead}
        />
        <Button
          data-testid="addtotailbutton"
          extraClass={styles.button}
          text="Добавить в tail"
          onClick={handleAddToTail}
          disabled={buttons || disableAddTailButtonCondition}
          isLoader={addedToTail}
        />
        <Button
          data-testid="deletefromheadbutton"
          extraClass={styles.button}
          text="Удалить из head"
          onClick={handleRemoveFromHead}
          disabled={arr.length <= 1 || disableRemoveHeadButtonCondition}
          isLoader={removedFromHead}
        />
        <Button
          data-testid="deletefromtailbutton"
          extraClass={styles.button}
          text="Удалить из tail"
          onClick={handleRemoveFromTail}
          disabled={arr.length <= 1 || disableRemoveTailButtonCondition}
          isLoader={removedFromTail}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.inputcontainer}>
          <Input
            data-testid="indexinput"
            placeholder="Введите индекс"
            type="text"
            value={indexValue}
            onChange={onIndexChange}
          />
        </div>
        <Button
          data-testid="addbyindexbutton"
          extraClass={styles.indexbutton}
          text="Добавить по индексу"
          onClick={handleAddByIndex}
          disabled={indexAddButton || disableAddIndexButtonCondition}
          isLoader={addedByIndex}
        />
        <Button
          data-testid="deletebyindexbutton"
          extraClass={styles.indexbutton}
          text="Удалить по индексу"
          onClick={handleRemoveByIndex}
          disabled={indexDeleteButton || disableRemoveIndexButtonCondition}
          isLoader={removedByIndex}
        />
      </div>
      <ul className={styles.circles} data-testid="circles" id="circleslist">
        {arr &&
          arr.map((item, index) => (
            <li
              key={index}
              className={styles.circlebox}
              data-testid="circleitem"
            >
              {loading === true &&
                (addedToHead === true ||
                  addedToTail === true ||
                  addedByIndex === true) &&
                index === indexOfInputValue && (
                  <div className={styles.smalltopcircle}>
                    <Circle
                      data-testid="topcircle"
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
                  <div className={styles.smallbottomcircle} id="bottomcircle">
                    <Circle
                      data-testid="bottomcircle"
                      isSmall
                      letter={circleValue}
                      state={ElementStates.Changing}
                    />
                  </div>
                )}
              <div className={styles.bigcircle}>
                <Circle
                  data-testid="circle"
                  letter={item.value}
                  state={item.color}
                  index={index}
                  head={displayHead(index)}
                  tail={displayTail(index)}
                />
              </div>
              {index !== arr.length - 1 && (
                <div className={styles.arrow} data-testid="arrow">
                  <ArrowIcon />
                </div>
              )}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
