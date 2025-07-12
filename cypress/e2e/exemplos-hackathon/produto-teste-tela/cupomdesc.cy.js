import { faker } from '@faker-js/faker';


it('Cadastro de aluno e venda de produto', () => {
    cy.loginSistema();
    const randomRabbit = faker.animal.rabbit()

    cy.get("button")
        .children()
        .contains("span", "Administrativo")
        .click();

    cy.get("a[href='/cupons']").click();

    cy.get(':nth-child(1) > [data-testid="btn-adicionar-novo"]').click();

    cy.contains("label", "Descrição")
        .parent()
        .find("input")
        .type("Desconto Hackathon 2025");

    cy.contains("label", "Código do cupom")
        .parent()
        .find("input")
        .type(randomRabbit);

    cy.contains("label", "Forma de inserção do cupom")
        .parent()
        .find("input")
        .click();

    cy.contains("Manual").click(); //manual unitário

    cy.contains("label", "Tipo do desconto")
        .parent()
        .find("input")
        .click()

    cy.contains("Valor fixo").click();

    cy.contains("label", "Valor de desconto")
        .siblings()
        .find("input", "value='R$ 0,00'")
        .type("1000");

    cy.get("input[value='Vendas com valor superior a um determinado valor']")
        .parents('[class*=MuiGrid-root]')
        .next()
        .contains("label", "Valor")
        .type("2000");

    cy.get("button[data-testid='confirmbutton-cadastrar-cupom-desconto-btn-salvar']").click()
    cy.contains('Salvo com sucesso!').should('be.visible');

    //3 pontinhos > ligar
    cy.get(':nth-child(1) > .MuiTableCell-alignRight > [data-testid="menu-button"] > .material-icons').click();

    cy.get("[class*='MuiList-root']")
        .contains('Ligar')
        .click();

    cy.get('button[data-testid="dialog-confirmacao-btn-confirmar"]').click()
    cy.contains('Ligado com sucesso').should('be.visible');

    //3 pontinhos > remover

    cy.get(':nth-child(1) > .MuiTableCell-alignRight > [data-testid="menu-button"]').click();

    cy.get("[class*='MuiList-root']")
        .contains('Remover')
        .click();

    cy.get('button[data-testid="dialog-excluir-btn-confirmar"]').click()
    cy.contains('Inativado com sucesso').should('be.visible');

})
