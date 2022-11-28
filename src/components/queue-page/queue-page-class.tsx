import { IQueue } from "../../types/queue";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;

    if (this.tail === this.size + 1) {
      this.tail = this.head;
      this.container[this.head % this.size] = item;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.length === 7;

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = [];
    this.length = 0;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };
}
