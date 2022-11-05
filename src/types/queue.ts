import { ElementStates } from "./element-states";
export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peek: () => T | null;
  }

export type TQueueItem = {
    value?: string;
    color: ElementStates;
    head?: string;
  };