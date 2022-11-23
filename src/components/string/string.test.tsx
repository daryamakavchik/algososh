import { ElementStates } from '../../types/element-states';
import { swap } from './utils';

const firstTestArr = [
    { value: 'a', color: ElementStates.Default },
    { value: 'b', color: ElementStates.Default },
    { value: 'c', color: ElementStates.Default }
];

const secondTestArr = [
    { value: 'c', color: ElementStates.Default },
    { value: 'b', color: ElementStates.Default },
    { value: 'a', color: ElementStates.Default }
];

describe('Swap function', () => {
    it("Works properly", () => {
        expect(swap(firstTestArr, 0, 2)).toEqual(secondTestArr);
    });
});