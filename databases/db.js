const {Sequelize} = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize (
    config.development.database,
    config.development.username,
    config.development.password,{
        host: config.development.host,
        dialect: config.development.dialect,
        pool: {
            max:5,
            min:0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const connect = async () => {
    try{
        await sequelize.authenticate();
        console.log('The connection has been established successful !');
    }
    catch (errror) {
        console.log(`Unable to connect to the database`, errror);
    }
}

module.exports = {
    sequelize,
    connect,
}