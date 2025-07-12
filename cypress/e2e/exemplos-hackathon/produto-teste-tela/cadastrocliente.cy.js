import { faker } from "@faker-js/faker";

it('Cadastro de aluno e venda de produto', () => {
    cy.CadastroCliente();

    cy.contains('Cliente salvo com sucesso!').should('be.visible')
    cy.get('.md-icon-button > span').click();

    cy.get("md-tabs")
        .parent()
        .contains("span", "Vendas")
        .click();

    cy.get('[ng-click="clienteVendaCtrl.newVenda()"]').click();

    cy.get("button")
        .parent()
        .contains("h6", "Padrão")
        .click();

    cy.get("button[data-testid='btn-produtos']").click();
    cy.get("button[data-testid='btn-adicionar']").click();
    cy.contains('Produto Hackathon adicionado com sucesso!').should('be.visible') //verificar funcionalidade

    cy.get("button[data-testid='btn-receber-agora']").click();

    cy.contains('Venda salva com sucesso!').should('be.visible') //adicionado por último
    cy.get('.md-icon-button > span').click(); //adicionado por último - verificar se está funcional

    cy.get("button")
        .children()
        .contains("h6", "Dinheiro")
        .click();

    cy.get("button[data-testid='btn-base']").click();
    cy.contains('Recebido com sucesso!').should('be.visible'); //alterado por último
    cy.get('.md-icon-button > span').click(); //adicionado por último

})