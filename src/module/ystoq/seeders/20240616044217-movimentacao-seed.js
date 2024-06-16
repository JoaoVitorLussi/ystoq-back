'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = { tableName: 'movimentacao_estoque', schema: "public" };
    await queryInterface.bulkInsert(table, [{
      id_estoque: 1,
      id_produto: 1,
      quantidade: 50,
      tipo: 0,
      data: new Date(),
      descricao: "Adicionando o primeiro produto no estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 1,
      quantidade: 25,
      tipo: 1,
      data: new Date(),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 1,
      quantidade: 75,
      tipo: 0,
      data: new Date(),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    const table = { tableName: 'movimentacao_estoque', schema: "public" };
    await queryInterface.bulkDelete(table);
  }
};
