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
      data: new Date(2024, 0, 15),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 1,
      quantidade: 75,
      tipo: 0,
      data: new Date(2024, 1, 20),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 2,
      quantidade: 30,
      tipo: 1,
      data: new Date(2024, 2, 25),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 3,
      quantidade: 50,
      tipo: 0,
      data: new Date(2024, 3, 30),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 4,
      quantidade: 20,
      tipo: 1,
      data: new Date(2024, 4, 5),
      descricao: "Devolução",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 5,
      quantidade: 100,
      tipo: 0,
      data: new Date(2024, 5, 10),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 6,
      quantidade: 40,
      tipo: 1,
      data: new Date(2024, 6, 15),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 7,
      quantidade: 70,
      tipo: 0,
      data: new Date(2024, 7, 20),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 8,
      quantidade: 35,
      tipo: 1,
      data: new Date(2024, 8, 25),
      descricao: "Devolução",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 9,
      quantidade: 55,
      tipo: 0,
      data: new Date(2024, 9, 30),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 10,
      quantidade: 45,
      tipo: 1,
      data: new Date(2024, 10, 5),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 9,
      quantidade: 65,
      tipo: 0,
      data: new Date(2024, 11, 10),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 8,
      quantidade: 25,
      tipo: 1,
      data: new Date(2024, 0, 15),
      descricao: "Devolução",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 9,
      quantidade: 85,
      tipo: 0,
      data: new Date(2024, 1, 20),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 10,
      quantidade: 60,
      tipo: 1,
      data: new Date(2024, 2, 25),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 10,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 3, 30),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 1,
      quantidade: 30,
      tipo: 1,
      data: new Date(2024, 4, 5),
      descricao: "Devolução",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 2,
      quantidade: 70,
      tipo: 0,
      data: new Date(2024, 5, 10),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 3,
      quantidade: 50,
      tipo: 1,
      data: new Date(2024, 6, 15),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 4,
      quantidade: 80,
      tipo: 0,
      data: new Date(2024, 7, 20),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 5,
      quantidade: 40,
      tipo: 1,
      data: new Date(2024, 8, 25),
      descricao: "Devolução",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 6,
      quantidade: 90,
      tipo: 0,
      data: new Date(2024, 9, 30),
      descricao: "Reposição de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 7,
      quantidade: 45,
      tipo: 1,
      data: new Date(2024, 10, 5),
      descricao: "Venda",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 8,
      quantidade: 60,
      tipo: 0,
      data: new Date(2024, 11, 10),
      descricao: "Compra",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 1,
      quantidade: 25,
      tipo: 0,
      data: new Date(2024, 1, 28),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 2,
      quantidade: 30,
      tipo: 0,
      data: new Date(2024, 3, 2),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 4,
      quantidade: 20,
      tipo: 0,
      data: new Date(2024, 5, 12),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 6,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 7, 22),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 8,
      quantidade: 35,
      tipo: 0,
      data: new Date(2024, 9, 8),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 10,
      quantidade: 45,
      tipo: 0,
      data: new Date(2024, 11, 18),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 8,
      quantidade: 25,
      tipo: 0,
      data: new Date(2024, 1, 15),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 10,
      quantidade: 60,
      tipo: 0,
      data: new Date(2024, 3, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 1,
      quantidade: 30,
      tipo: 0,
      data: new Date(2024, 5, 5),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 3,
      quantidade: 50,
      tipo: 0,
      data: new Date(2024, 7, 15),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 5,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 1,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 5,
      quantidade: 50,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 2,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 4,
      quantidade: 60,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 4,
      id_produto: 6,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 1,
      id_produto: 10,
      quantidade: 75,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 8,
      quantidade: 35,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 5,
      id_produto: 3,
      quantidade: 90,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 3,
      id_produto: 10,
      quantidade: 40,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_estoque: 2,
      id_produto: 7,
      quantidade: 80,
      tipo: 0,
      data: new Date(2024, 9, 25),  
      descricao: "Reposição adicional de estoque",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    const table = { tableName: 'movimentacao_estoque', schema: "public" };
    await queryInterface.bulkDelete(table);
  }
};
