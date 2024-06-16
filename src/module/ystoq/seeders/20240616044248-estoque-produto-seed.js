'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.bulkInsert(table, [{
      id_estoque: 1,
      id_produto: 1,
      quantidade: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.bulkDelete(table, null, {});
  }
};
