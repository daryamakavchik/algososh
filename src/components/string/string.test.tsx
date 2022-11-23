import { ElementStates } from '../../types/element-states';
import { swap } from './utils';
import { reverse } from './string';

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

describe('Строка разворачивается', () => {
    it("Корректно", () => {
        expect(swap(firstTestArr, 0, 2)).toEqual(secondTestArr);
    });
});

const setInputArr = jest.fn();
const setLoader = jest.fn();

describe('Строка разворачивается корректно', () => {
    it("Строка с четным числом символов разворачивается корректно", async () => {
        const string = 'hell';
        const reverseString = 'lleh';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setInputArr, setLoader );
        expect(setInputArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Строка с нечетным числом символов разворачивается корректно", async () => {
        const string = 'hello';
        const reverseString = 'olleh';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setInputArr, setLoader);
        expect(setInputArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Строка с одним символом разворачивается корректно", async () => {
        const string = 'h';
        const reverseString = 'h';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setInputArr, setLoader);
        expect(setInputArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Пустая строка разворачивается корректно", async () => {
        const string = '';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setInputArr, setLoader);
        expect(setInputArr).toHaveBeenCalledTimes(0);
    });
});