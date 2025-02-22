'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('JobApplications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true     
      },
      resume_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coverLetter: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('JobApplications');
  }
};
