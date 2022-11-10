import { IStack } from "../../types/stack";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peek = (): T => {
    return this.container[this.container.length - 1];
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getElements = () => this.container;
}
