'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'admin', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      nome: 'Admin Master',
      senha: '$2a$10$6Y/slsVBvA1jTBjf0AZX8.g0t5EWhLZWGexbBV/yBczBicUfnTVwW',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Pedro',
      senha: '$2a$10$2dg9DAutCmvDc7ZRnNr.begNFYzvvmdgzeAaTQos/vm3.defKmC2u',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gustavo',
      senha: '$2a$10$wCnNZLQpgbL3NCK7nar4juaD444vNnL4JSNVAEwCLssA/o0Po3hsy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Naieli',
      senha: '$2a$10$16N15l5KTtOgONqzTKgljuvKFxXnIo3hv1CMJ0b9VOmrbNiMBaa7i',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  
  async down (queryInterface, Sequelize) {
    const table = {tableName: 'admin', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
