import { DELAY_LONG } from "../../src/utils/constants";
import { url, COLOR_DEFAULT, COLOR_CHANGING, COLOR_MODIFIED } from './utils';

describe("Строка отображается корректно", function () {
  before(function () {
    cy.visit(`${url}/recursion`);
  });

  it("Кнопка неактивна при пустом поле ввода", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Строка отражается верно", function () {
    const stringLength = 5;
    const initialString = "strin";
    const initialColors = [
      COLOR_MODIFIED,
      COLOR_DEFAULT,
      COLOR_DEFAULT,
      COLOR_DEFAULT,
      COLOR_MODIFIED,
    ];

    const changingString = "nirts";
    const changingColors = [
      COLOR_CHANGING,
      COLOR_MODIFIED,
      COLOR_DEFAULT,
      COLOR_MODIFIED,
      COLOR_CHANGING,
    ];

    const finalString = "nirts";
    const finalColors = [
      COLOR_CHANGING,
      COLOR_CHANGING,
      COLOR_CHANGING,
      COLOR_CHANGING,
      COLOR_CHANGING,
    ];

    cy.get("input").type(initialString);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index, $list) => {
      expect($list).to.have.length(stringLength);
      cy.get($el).contains(initialString[index]);
      cy.get($el).should("have.css", "border-color", initialColors[index]);
    });

    cy.wait(DELAY_LONG);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index, $list) => {
      cy.get($el).should("have.css", "border-color", changingColors[index]);
    });

    cy.wait(DELAY_LONG);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap, index, $list) => {
      expect($list).to.have.length(stringLength);
      cy.get($el).contains(finalString[index]);
      cy.get($el).should("have.css", "border-color", finalColors[index]);
    });
  });
});
