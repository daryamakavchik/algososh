import { TArray } from "../../types/string";

export const swap = (
  arr: TArray[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};
