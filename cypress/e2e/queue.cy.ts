import { DELAY_SHORT } from "../../src/utils/constants";
const url = "http://localhost:3000";

describe("Страница Очередь отображается корректно", function () {
  before(function () {
    cy.visit(`${url}/queue`);
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

  it("Элементы верно добавляются в очередь", function () {

    cy.get("[data-testid=circle]").each(($list) => {
      cy.get($list).should("have.css", "border-color", defaultColor);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(`${firstElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(`${secondElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(`${thirdElement}`);
    cy.get("[data-testid=addbutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });


  it("Элементы верно удаляются из очереди", function () {
    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("head");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("head");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deletebutton]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(DELAY_SHORT);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain("");
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=circle]").each(($list) => {
      expect($list).to.contain("");
    });
  });
});

  it("Очередь очищается корректно", function () {
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

    cy.get("[data-testid=circle]").each(($list) => {
      expect($list).to.contain("");
    });
  });
});