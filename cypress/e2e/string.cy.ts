import { DELAY_LONG } from '../../src/utils/constants';
const url = "http://localhost:3000";

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
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const changingString = "nirts";
    const changingColors = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const finalString = "nirts";
    const finalColors = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.get("input").type(initialString);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(initialString[index]);
      cy.get($el).should("have.css", "border-color", initialColors[index]);
    });

    cy.wait(DELAY_LONG);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(changingString[index]);
      cy.get($el).should("have.css", "border-color", changingColors[index]);
    });

    cy.wait(DELAY_LONG);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(finalString[index]);
      cy.get($el).should("have.css", "border-color", finalColors[index]);
    });
  });
});
