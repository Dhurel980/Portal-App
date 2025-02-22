'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail:true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date        
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
