'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date
      },
      updatedAt: {     
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles')
  }
};
