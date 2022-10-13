const { DB_USER, DB_PASS, DB_BD, DB_HOST, NODE_ENV } = process.env;
import { Sequelize, Op } from 'sequelize';
//import userInit from './models/User';

const sequelize =
    NODE_ENV === 'production'
        ? new Sequelize({
            database: DB_BD,
            dialect: 'postgres',
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
        : new Sequelize(
            `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_BD}`
            , {
                logging: false,
                native: false
            }
        );

//userInit(sequelize)


export default {
    ...sequelize.models,
    conn: sequelize,
    Op
}