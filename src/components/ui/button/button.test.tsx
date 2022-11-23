import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Кнопка рендерится без ошибок', () => {
    it("Кнопка с текстом", () => {
        const tree = renderer
            .create(<Button text='test' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Кнопка без текста", () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Деактивированная кнопка", () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Кнопка с загрузкой", () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Кнопка работает при нажатии', () => {
        const callBack = jest.fn();
        render(<Button onClick={callBack}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(callBack).toHaveBeenCalled();
    });
});