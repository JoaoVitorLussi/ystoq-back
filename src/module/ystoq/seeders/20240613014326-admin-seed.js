'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'admin', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      nome: 'João',
      senha: '123321',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Pedro',
      senha: '12312',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gustavo',
      senha: '123213',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Naieli',
      senha: '123213',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  
  async down (queryInterface, Sequelize) {
    const table = {tableName: 'admin', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
