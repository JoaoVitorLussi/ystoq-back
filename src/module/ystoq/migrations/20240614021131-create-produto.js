'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = {tableName: 'produto', schema: "public"};
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING
      },
      id_categoria_produto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categoria_produto',
          key: 'id'
        },
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id'
        },
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
    const table = {tableName: 'produto', schema: "public"};
    await queryInterface.dropTable(table);
  }
};