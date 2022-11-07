import { ElementStates } from "./element-states";

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, index: number) => void
  }

export type TListItem = {
  value: string;
  color: ElementStates;
};
