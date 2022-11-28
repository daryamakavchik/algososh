import { DELAY_SHORT } from '../../src/utils/constants';
import { url, COLOR_DEFAULT } from './utils';

describe("Страница Фибоначчи отображается корректно", function () {
  before(function () {
    cy.visit(`${url}/fibonacci`);
  });

  it("Кнопка неактивна при пустом поле ввода", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

it("Числа Фибоначчи генерируются корректно", function () {
    const num = 5;
    const finalArr = [1, 1, 2, 3, 5, 8];
    const color = COLOR_DEFAULT;
    
    cy.get("input").type(`${num}`);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });

    cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });

  cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });

  cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });

  cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });

  cy.wrap(finalArr).each(() => {
    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });
  });
});