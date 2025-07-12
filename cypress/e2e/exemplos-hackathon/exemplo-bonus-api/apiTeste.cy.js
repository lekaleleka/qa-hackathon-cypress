import { faker } from '@faker-js/faker';

it("Inserir e remover", () => {
  cy.loginapi();

  const randomRabbit = faker.animal.rabbit()
  console.log('O nome do coelho é: ', randomRabbit)

  cy.nextRequest({
    method: "POST",
    url: "/Modalidade/Inserir",
    body: {
      Descricao: randomRabbit,
      Logo: 1,
      CorWod: "",
    },
  }).then((response) => {

    const responseBody = response.body
    console.log('Resposta do body: ', responseBody)

    const responseId = responseBody.Content.Id
    console.log('Id deve ser: ', responseId)

    console.log('Qualquer coisa', response)
    expect(response.status).to.eq(200);

    cy.nextRequest({
      method: "POST",
      url: "/Modalidade/Inativar",
      body: {
        Codigo: responseId,
      },
    }).then((response) => {
      console.log('Inativo: ', response)
    })

  });
});