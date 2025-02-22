'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registration_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false,
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
    await queryInterface.dropTable('Companies');
  }
};
