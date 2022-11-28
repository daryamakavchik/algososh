import { url } from './utils';

describe("Роутинг настроен корректно", function () {
  before(function () {
    cy.visit(url);
  });

  it("открывается страница Строка", function () {
    cy.visit(`${url}/recursion`);
    cy.get('h3').contains('Строка');
  });

  it("открывается страница Фибоначчи", function () {
    cy.visit(`${url}/fibonacci`);
    cy.get('h3').contains('Последовательность Фибоначчи');
  });

  it("открывается страница Сортировка массива", function () {
    cy.visit(`${url}/sorting`);
    cy.get('h3').contains('Сортировка массива');
  });

  it("открывается страница Стек", function () {
    cy.visit(`${url}/stack`);
    cy.get('h3').contains('Стек');
  });

  it("открывается страница Очередь", function () {
    cy.visit(`${url}/queue`);
    cy.get('h3').contains('Очередь');
  });

  it("открывается страница Связный список", function () {
    cy.visit(`${url}/list`);
    cy.get('h3').contains('Связный список');
  });
});