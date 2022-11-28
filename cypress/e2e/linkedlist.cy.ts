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
    cy.get("[data-testid=addtoheadbutton]").should("be.disabled");
    cy.get("[data-testid=addtotailbutton]").should("be.disabled");
    cy.get("[data-testid=addbyindexbutton]").should("be.disabled");
    cy.get("[data-testid=deletebyindexbutton]").should("be.disabled");
  });

  it("Список отображается корректно", function () {
    cy.get("#circleslist").find("li");
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 3) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент добавляется в список", function () {
    cy.get("[data-testid=input]").should("be.empty");
    cy.get("[data-testid=input]").type(`${value}`);

    cy.get("[data-testid=addtoheadbutton]").click();

    cy.get("[data-testid=topcircle]");

    cy.get("[data-testid=topcircle]").contains(value);
    cy.get("[data-testid=topcircle]").should(
      "have.css",
      "border-color",
      modifiedColor
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 5);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 4);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("have.css", "border-color", changingColor);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 4) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент добавляется в tail", function () {
    cy.get("[data-testid=input]").should("be.empty");
    cy.get("[data-testid=input]").type(`${value}`);

    cy.get("[data-testid=addtotailbutton]").click();

    cy.get("[data-testid=topcircle]");

    cy.get("[data-testid=topcircle]").contains(value);
    cy.get("[data-testid=topcircle]").should(
      "have.css",
      "border-color",
      modifiedColor
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 6);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 5);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 5) {
          cy.get($el).should("have.css", "border-color", changingColor);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 5) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент удаляется из head", function () {
    cy.get("[data-testid=deletefromheadbutton]").click();
    cy.get("#bottomcircle").contains(value);

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 5);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 4) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент удаляется из tail", function () {
    cy.get("[data-testid=deletefromtailbutton]").click();

    cy.get("#bottomcircle").contains(value);

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 4);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 3);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 3) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент добавляется по индексу", function () {
    cy.get("[data-testid=input]").should("be.empty");
    cy.get("[data-testid=input]").type(`${value}`);

    cy.get("[data-testid=indexinput]").should("be.empty");
    cy.get("[data-testid=indexinput]").type(`${index}`);

    cy.get("[data-testid=addbyindexbutton]").click();

    cy.get("[data-testid=topcircle]");

    cy.get("[data-testid=topcircle]").contains(value);
    cy.get("[data-testid=topcircle]").should(
      "have.css",
      "border-color",
      modifiedColor
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        if ($el && index === 0) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        if ($el && index === 1) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        }
      }
    );

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 5);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 4);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 2) {
          cy.get($el).should("have.css", "border-color", changingColor);
          expect($el).to.contain(`${value}`);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 4) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });

  it("Элемент удаляется по индексу", function () {
    cy.get("[data-testid=indexinput]").should("be.empty");
    cy.get("[data-testid=indexinput]").type(`${index}`);
    cy.get("[data-testid=deletebyindexbutton]").click();

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else if ($el && index === 1) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circle]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else if ($el && index === 1) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else if ($el && index === 2) {
          cy.get($el).should("have.css", "border-color", modifiedColor);
        } else {
          cy.get($el).should("have.css", "border-color", defaultColor);
        }
      }
    );

    cy.get("#bottomcircle").contains(value);

    cy.wait(DELAY_SHORT);

    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .should("have.length", 4);
    cy.get("[data-testid=circles]")
      .get("[data-testid=circle]")
      .get("[data-testid=circleitem]")
      .get("[data-testid=arrow]")
      .should("have.length", 3);

    cy.get("[data-testid=circle]").each(($el: keyof HTMLElementTagNameMap) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 0) {
          cy.get($el).should("contain", "head");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=tail]").each(
      ($el: keyof HTMLElementTagNameMap, index) => {
        if ($el && index === 3) {
          cy.get($el).should("contain", "tail");
        } else {
          cy.get($el).should("contain", "");
        }
      }
    );

    cy.get("[data-testid=index]").each(
      ($el: keyof HTMLElementTagNameMap, index, $list) => {
        cy.get($el).should("contain", index);
      }
    );
  });
});
