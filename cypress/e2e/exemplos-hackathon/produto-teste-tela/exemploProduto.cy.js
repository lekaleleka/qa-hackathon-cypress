describe("Exemplo Hackathon!", () => {
  it("Cadastro Produto e remover", () => {
    // ✅ Realiza login no sistema com comando personalizado
    cy.loginSistema();

    // 🛒 CADASTRAR NOVO PRODUTO
    // Acessa o menu lateral "Estoque"
    cy.get('a[ui-sref="app.estoque"]').click();

    // Clica no botão "Novo Produto"
    cy.get('button[ng-click="vm.newProduto()"]').click();

    // Preenche o campo "Descrição" do produto
    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type("Produto Hackathon 2025!");

    // Preenche o campo "Preço de custo"
    cy.contains("label", "Preço de custo").parent().find("input").type("1500");

    // Preenche o campo "Preço de venda"
    cy.contains("label", "Preço de venda").parent().find("input").type("1500");

    // Clica no botão "Salvar" para concluir o cadastro do produto
    cy.get('button[data-testid="btn-salvar"]').click();

    // ❌ REMOVER PRODUTO CADASTRADO
    // Preenche o campo de filtro com o nome do produto
    cy.get('input[ng-model="vm.filter.Descricao"]').type(
      "Produto Hackathon 2025!"
    );

    // Clica no botão de "Mais opções" (ícone de 3 pontos)
    cy.get('button[aria-label="Open List Menu"]').click();

    // Seleciona a opção "Remover" no menu
    cy.get('button[ng-click="vm.onClickInativar(produto.Id)"]').click();

    // Confirma a remoção no modal exibido
    cy.get('button[ng-disabled="dialog.required && !dialog.result"]').click();
  });
});
