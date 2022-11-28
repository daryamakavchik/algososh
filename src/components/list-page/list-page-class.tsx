import { ILinkedList } from "../../types/list";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
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

  deleteHead() {
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

  deleteTail() {
    if (!this.head) return null;
    let currHead = this.head;
    while (
      currHead !== null &&
      currHead.next !== null &&
      currHead.next.next != null
    )
      currHead = currHead.next;
    currHead.next = null;
    this.size--;
    return this.head;
  }

  append(element: T) {
    let node = new LinkedListNode(element);
    if (this.size === 0) {
      this.head = node;
      this.tail = this.head.next;
    } else {
      let current = this.head;
      while (current && current.next !== null) {
        current = current.next;
      }
      if (current && current.next === null) {
        current.next = new LinkedListNode(element);
        this.tail = current.next;
      }
    }
    this.size++;
  }

  prepend(element: T) {
    const newNode = new LinkedListNode(element);
    const currentNode = this.head;
    this.head = newNode;
    this.head.next = currentNode;
    this.size++;
  }

  addByIndex(element: T, index: number) {
    const newNode = new LinkedListNode(element);

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
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();
    let prev = this.getCurr(index - 1);
    if (prev?.next) {
      let deletedNode = prev?.next;
      prev.next = deletedNode?.next;
      this.size--;
      return deletedNode;
    }
  }
}
