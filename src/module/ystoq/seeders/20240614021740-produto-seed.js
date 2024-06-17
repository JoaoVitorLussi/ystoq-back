'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'produto', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      descricao: 'Arroz',
      id_categoria_produto: 1,
      quantidade: 100,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Coca Cola',
      id_categoria_produto: 2,
      quantidade: 100,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Geladeira',
      id_categoria_produto: 3,
      quantidade: 50,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Smartphone',
      id_categoria_produto: 4,
      quantidade: 200,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Sofá',
      id_categoria_produto: 5,
      quantidade: 20,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Camiseta',
      id_categoria_produto: 6,
      quantidade: 300,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Tênis',
      id_categoria_produto: 7,
      quantidade: 150,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Cubo Mágico',
      id_categoria_produto: 8,
      quantidade: 120,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Livro de Ficção',
      id_categoria_produto: 9,
      quantidade: 80,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Perfume',
      id_categoria_produto: 10,
      quantidade: 60,
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
