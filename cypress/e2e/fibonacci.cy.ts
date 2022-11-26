import { DELAY_SHORT } from '../../src/utils/constants';
const url = "http://localhost:3000";

describe("Строка отображается корректно", function () {
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
    const color = "rgb(0, 50, 255)";
    
    cy.get("input").type(`${num}`);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el, index) => {
      cy.get($el).contains(finalArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(DELAY_SHORT);
  });
});