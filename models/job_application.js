const DataTypes = require('sequelize');

const { sequelize } = require('../databases/db');
const User = require('../models/user');
const Job = require('../models/jobs');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const JobApplication = sequelize.define('JobApplications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true     
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'resume_url'
      },
      coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      }
}, {
    timestamps: true,
});

JobApplication.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'Jobs',
  onDelete: 'CASCADE',
});

Job.hasMany(JobApplication, {
  foreignKey: 'jobId',
  as: 'JobApplication',
  onDelete: 'CASCADE',
});

JobApplication.belongsTo(User, {
  foreignKey: 'userId',
  as: 'Users',
  onDelete: 'CASCADE',
});

User.hasMany(JobApplication, {
  foreignKey: 'userId',
  as: 'jobApplication',
  onDelete: 'CASCADE',
});

module.exports = JobApplication;