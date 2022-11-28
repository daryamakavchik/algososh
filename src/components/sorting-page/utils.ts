import { ElementStates } from "../../types/element-states";

export const createArr = () => {
  const arr = [];
  const length = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
  for (let i = 0; i < length; i++) {
    arr.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return arr;
};
