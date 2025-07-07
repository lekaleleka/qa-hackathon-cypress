it('Cadastro de aluno e venda de produto', () => {
    cy.CadastroCliente();

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
    cy.get("button[data-testid='btn-receber-agora']").click();

    cy.get("button")
        .children()
        .contains("h6", "Dinheiro")
        .click();

    cy.get("button[data-testid='btn-base']").click();
    
})