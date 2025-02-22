const DataTypes = require('sequelize');

const { sequelize } = require('../databases/db');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const Company = require('./company');
const Job = sequelize.define('Jobs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salaryRange: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "negotiable"
      },
      jobType: {
        type: DataTypes.ENUM('Full-time', 'Part-Time', 'Contract'),
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Open', 'Closed'),
        allowNull:false,
        defaultValue: 'Open'
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      }
},{
    timestamps: true,
});

Job.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'Companies',
  onDelete: 'CASCADE',
});

Company.hasMany(Job, {
  foreignKey: 'companyId',
  as: 'Job',
  onDelete: 'CASCADE',
});

module.exports = Job;