'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salaryRange: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "negotiable"
      },
      jobType: {
        type: Sequelize.ENUM('Full-time', 'Part-Time', 'Contract'),
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Open', 'Closed'),
        allowNull:false,
        defaultValue: 'Open'
      },
      
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Jobs');
  }
};
