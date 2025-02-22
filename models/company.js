const DataTypes = require('sequelize');

const { sequelize } = require('../databases/db');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const Company = sequelize.define('Companies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registrationNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'registration_number'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'logo_url'
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_verified'
      },userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
      }
},{
    timestamps: true,
});


module.exports = Company;