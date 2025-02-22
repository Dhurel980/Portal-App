const DataTypes = require('sequelize');

const {sequelize} = require('../databases/db');

const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', 
        key: 'id',
      },
    }
}, {
    timestamps: true,
});


module.exports = Contact;