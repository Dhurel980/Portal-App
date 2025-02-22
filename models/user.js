const DataTypes = require('sequelize');

const {sequelize} = require('../databases/db');
const Company = require('./company');
const Contact = require('./contact');

const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const User = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail:true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name'
      },      
      phone: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: 'Roles',
        key: 'id'
      },
}, {
    timestamps: true,
});

User.hasOne(Company, {
  foreignKey: 'userId',
  as: 'Companies'
});

Company.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'
});

User.hasMany(Contact, {
  foreignKey: 'roleId',
  as: 'Contact'
});

Contact.belongsTo(User, {
  foreignKey: 'roleId',
  as: 'User'
});

module.exports = User;