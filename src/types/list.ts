import { ElementStates } from "./element-states";

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
  }

export type TListItem = {
  value: string;
  color: ElementStates;
};
