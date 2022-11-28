import { DELAY_SHORT } from "../../src/utils/constants";
import { url } from './utils';

describe("Страница Стек отображается корректно", function () {
  before(function () {
    cy.visit(`${url}/stack`);
  });

  it("Кнопка неактивна при пустом поле ввода", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  const firstElement = 1;
  const secondElement = 2;
  const thirdElement = 3;
  const modifiedColor = "rgb(210, 82, 225)";
  const defaultColor = "rgb(0, 50, 255)";

  it("Элементы верно добавляются в стек", function () {
    cy.get("input").type(`${firstElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters).to.have.length(1);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("top");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(`${secondElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters).to.have.length(2);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("top");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(`${thirdElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters).to.have.length(3);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("top");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      expect($el).to.contain(index);
    });
  });

  it("Элементы верно удаляются из стека", function () {
    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(2)).to.contain(thirdElement);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.wait(DELAY_SHORT);
      expect($list).to.have.length(2);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters).to.have.length(2);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("top");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.wait(DELAY_SHORT);
      expect($list).to.have.length(1);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters).to.have.length(1);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("top");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(DELAY_SHORT);
    cy.get("[data-testid=circles]").should("be.empty");
  });

  it("Cтек очищается корректно", function () {
    cy.get("input").should("be.empty");
    cy.get("input").type(`${firstElement}`);
    cy.get("[data-testid=addbutton]").click();
    cy.wait(DELAY_SHORT);

    cy.get("input").should("be.empty");
    cy.get("input").type(`${secondElement}`);
    cy.get("[data-testid=addbutton]").click();
    cy.wait(DELAY_SHORT);

    cy.get("input").should("be.empty");
    cy.get("input").type(`${thirdElement}`);
    cy.get("[data-testid=addbutton]").click();
    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=clearbutton]").click();
    cy.get("[data-testid=circles]").should("be.empty");
  });
});
