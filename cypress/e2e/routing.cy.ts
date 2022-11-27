export {}
const url = 'http://localhost:3000';

describe("Роутинг настроен корректно", function () {
  before(function () {
    cy.visit(url);
  });

  it("открывается страница Строка", function () {
    cy.visit(`${url}/recursion`);
  });

  it("открывается страница Фибоначчи", function () {
    cy.visit(`${url}/fibonacci`);
  });

  it("открывается страница Сортировка массива", function () {
    cy.visit(`${url}/sorting`);
  });

  it("открывается страница Стек", function () {
    cy.visit(`${url}/stack`);
  });

  it("открывается страница Очередь", function () {
    cy.visit(`${url}/queue`);
  });

  it("открывается страница Связный список", function () {
    cy.visit(`${url}/list`);
  });
});