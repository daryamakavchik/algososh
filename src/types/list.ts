import { ElementStates } from "./element-states";

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    removeHead: () => void;
    removeTail: () => void;
    addByIndex: (element: T, index: number) => void;
    removeByIndex: (index: number) => void
  }

export type TListItem = {
  value: string;
  color: ElementStates;
};
