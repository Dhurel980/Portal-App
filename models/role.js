const DataTypes = require('sequelize');

const {sequelize} = require('../databases/db');
const User = require('./user');
const Role = sequelize.define("Roles", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
}, {
    timestamps: true,
});

Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'Users'
});

User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'Role'
});
module.exports = Role;