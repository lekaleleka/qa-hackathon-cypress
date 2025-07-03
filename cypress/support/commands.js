// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "./e2e";
import "./index";

Cypress.Commands.add("loginSistema", () => {
  //login
  cy.viewport(1360, 768);
  cy.visit("https://sandbox.appnext.fit/login");
  cy.get('input[type="email"]').type("123123@teste.com");
  cy.get('[data-testid="btn-continuar"]').click();
  cy.get('input[type="password"]').type("123456a");
  cy.get('[data-testid="btn-entrar"]').click();

  cy.intercept("GET", "/api/PerfilAcesso/RecuperarPermissoesUsuarioLogado").as(
    "capturedRequest"
  );
  cy.wait("@capturedRequest").then((interception) => {
    expect(interception.response.status).to.equal(200);
    expect(interception.response.body).to.not.be.empty;
  });
});

Cypress.Commands.add("nextRequest", (options) => {
  return cy.request({
    ...options,
    headers: {
      Authorization: "Bearer " + Cypress.env("token"),
    },
  });
});

function nextLogin(userId, emailUser, senha, codigoFilial) {
  cy.request({
    method: "POST",
    url: "/token",
    form: true,
    body: {
      grant_type: "password",
      username: emailUser,
      password: senha,
      codigoFilial: codigoFilial,
    },
    headers: {
      "Front-version": "1.1.4",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);

    const authToken = response.body.access_token;

    Cypress.env("token", authToken);
    Cypress.env("userId", userId);

    window.localStorage.setItem("X-AUTH-TOKEN", authToken);
    window.localStorage.setItem(
      "USER",
      JSON.stringify({
        Id: userId,
        Email: emailUser,
        CodigoFilial: codigoFilial,
        Nome: "",
        UrlImagem: null,
      })
    );
    cy.log("auth-token-login", window.localStorage.getItem("X-AUTH-TOKEN"));
  });
}

Cypress.Commands.add("loginapi", () => {
  const userId = Cypress.env("USERID");
  const emailUser = Cypress.env("EMAIL");
  const senha = Cypress.env("SENHA");
  const codigoFilial = Cypress.env("CODFILIAL");

  nextLogin(userId, emailUser, senha, codigoFilial);
});
