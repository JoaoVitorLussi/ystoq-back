'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.bulkInsert(table, [
      { id_estoque: 1, id_produto: 1, quantidade: 125, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 5, id_produto: 4, quantidade: 80, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 2, id_produto: 3, quantidade: 50, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 1, id_produto: 9, quantidade: 65, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 4, id_produto: 1, quantidade: 40, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 1, id_produto: 5, quantidade: 50, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 4, id_produto: 2, quantidade: 70, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 2, id_produto: 2, quantidade: 40, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 4, id_produto: 7, quantidade: 70, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 5, id_produto: 9, quantidade: 55, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 3, id_produto: 4, quantidade: 60, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 2, id_produto: 9, quantidade: 85, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 1, id_produto: 6, quantidade: 90, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 4, id_produto: 6, quantidade: 40, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 1, id_produto: 10, quantidade: 75, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 5, id_produto: 8, quantidade: 35, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 2, id_produto: 8, quantidade: 60, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 3, id_produto: 5, quantidade: 100, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 5, id_produto: 3, quantidade: 90, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 3, id_produto: 10, quantidade: 80, createdAt: new Date(), updatedAt: new Date() }, 
      { id_estoque: 2, id_produto: 7, quantidade: 35, createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.bulkDelete(table, null, {});
  }
};
