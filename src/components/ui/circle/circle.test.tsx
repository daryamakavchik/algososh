import { Circle } from './circle';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Круг рендерится без ошибок', () => {
    it("Круг без текста", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг с буквами", () => {
        const tree = renderer
            .create(<Circle letter='test' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("Круг с head", () => {
        const tree = renderer
            .create(<Circle letter='test' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг с React-элементом в head", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг с React-элементом в tail", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг с tail", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг с index", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг isSmall", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг default", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг changing", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Круг modified", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});