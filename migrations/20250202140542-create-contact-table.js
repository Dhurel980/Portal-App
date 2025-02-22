'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',  
          key: 'id',
        },
        
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Contacts');
  }
};
