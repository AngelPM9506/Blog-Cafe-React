const { NODE_ENV, DB_USER, DB_PASS, DB_BD, DB_HOST, DB_DRIVER } = require('dotenv').config().parsed;
const { Sequelize, Op } = require('sequelize');
const modelUser = require('./models/User');

const sequelize = NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_BD,
        dialect: DB_DRIVER,
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASS,
        pool: {
            max: 3,
            min: 1,
            idle: 100000
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            keepAlive: true
        },
        ssl: true
    })
    : new Sequelize(`${DB_DRIVER}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_BD}`, {
        logging: false,
        native: false
    });

/**inicializar modelos */
modelUser(sequelize);

/**exportar modulo */
module.exports = {
    ...sequelize.models,
    conn: sequelize,
    Op
}