import { DELAY_SHORT } from "../../src/utils/constants";
const url = "http://localhost:3000";

describe("Страница Связный список отображается корректно", function () {
  before(function () {
    cy.visit(`${url}/list`);
  });

  it("Кнопка неактивна при пустом поле ввода", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  const defaultColor = "rgb(0, 50, 255)";
  const modifiedColor = "rgb(210, 82, 225)";
  const changingColor = "rgb(127, 224, 81)";
  const value = 1;
  const index = 2;

  it("Кнопки добавления и удаления по индексу неактивны при пустом поле ввода", function () {
    cy.get("input").should("be.empty");
    cy.get('[data-testid=addtoheadbutton]').should("be.disabled");
    cy.get('[data-testid=addtotailbutton]').should("be.disabled");
    cy.get('[data-testid=addbyindexbutton]').should("be.disabled");
    cy.get('[data-testid=deletebyindexbutton]').should("be.disabled");
  });

  it("Список отображается корректно", function () {
    cy.get('#circleslist').find("li");
    //checlklength

    cy.get('[data-testid=circle]').each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get('[data-testid ="letter"]').each(($letter) => {
      [][0] = $letter.text();
      [][1] = $letter.text();
      [][2] = $letter.text();
      [][3] = $letter.text();
    });

    cy.get('[data-testid=head]').within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get('[data-testid=tail]').within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get('[data-testid=index]').each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });

  });

  it("Элемент добавляется в список", function () {
    cy.get('[data-testid=input]').should("be.empty");
    cy.get('[data-testid=input]').type(`${value}`);

    cy.get('[data-testid=addtoheadbutton]').click();

    cy.get('[data-testid=topcircle]');

    cy.get('[data-testid=topcircle]').contains(value);
    //check top circle class having modified color

    cy.wait(DELAY_SHORT);

    //check circles length and arrows length


    cy.get('[data-testid=circle]').each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(DELAY_SHORT);

    cy.get('[data-testid=circle]').each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get('[data-testid=head]').within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get('[data-testid=tail]').within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get('[data-testid=index]').each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

});