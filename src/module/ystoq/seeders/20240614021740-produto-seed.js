'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'produto', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      descricao: 'Coca Cola',
      id_categoria_produto: 2,
      quantidade: 100,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Batedeira',
      id_categoria_produto: 3,
      quantidade: 20,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Cubo Mágico',
      id_categoria_produto: 1,
      quantidade: 25,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    const table = {tableName: 'produto', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
