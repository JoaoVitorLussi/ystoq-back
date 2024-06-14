'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'categoria_produto', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      descricao: 'Alimentos',
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Bebidas',
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Eletrodomésticos',
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    const table = {tableName: 'categoria_produto', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
