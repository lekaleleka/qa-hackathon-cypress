it("Inserir ATIVIDADE HACKATHON!", () => {
  // 🔐 Realiza login via API, evitando passar pela interface e acelerando o teste
  cy.loginapi();

  // 📡 Dispara uma requisição POST autenticada para inserir uma nova atividade
  cy.nextRequest({
    method: "POST",
    url: "/TipoAtividade/Inserir",
    body: {
      Descricao: "Atividade HACKATHON!",
    },
  }).then((response) => {
    // ✅ Valida se a resposta da API retornou com sucesso (status 200)
    expect(response.status).to.eq(200);
  });
});
