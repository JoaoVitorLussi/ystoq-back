'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'estoque', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      descricao: 'Estoque Reserva 1',
      endereco: 'Rua 1',
      quantidade: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Estoque Reserva 2',
      endereco: 'Rua 2',
      quantidade: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Estoque Reserva 3',
      endereco: 'Rua 3',
      quantidade: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descricao: 'Estoque Secundário',
      endereco: 'Rua 4',
      quantidade: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    descricao: 'Estoque Principal',
    endereco: 'Rua 5',
    quantidade: 50,
    createdAt: new Date(),
    updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    const table = {tableName: 'estoque', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
