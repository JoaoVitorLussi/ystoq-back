'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_estoque: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estoque',
          key: 'id'
        },
        allowNull: false
      },
      id_produto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produto',
          key: 'id'
        },
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const table = { tableName: 'estoque_produto', schema: "public" };
    await queryInterface.dropTable(table);
  }
};