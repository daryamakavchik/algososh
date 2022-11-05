import { ElementStates } from "./element-states";

export type TStackItem = {
  value: string;
  color: ElementStates;
};

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  getSize: () => number;
}
