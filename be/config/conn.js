const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    query: {
        raw: true,
    },
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

const conn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected db');
    } catch (error) {
        console.error(error);
    }
};

module.exports = conn;
