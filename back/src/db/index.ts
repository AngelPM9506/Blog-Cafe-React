import dotenv from 'dotenv';
import { Dialect, Sequelize, Op, DataTypes } from 'sequelize';
import rolleModel from './models/Rolle';
import userMoel from './models/User';
dotenv.config();

const { NODE_ENV, DB_USER, DB_PASS, DB_BD, DB_HOST, DB_DRIVER } = process.env;

const sequelize = NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_BD,
        dialect: DB_DRIVER as Dialect,
        host: DB_HOST,
        port: 5432,
        username: DB_USER as string,
        password: DB_PASS as string,
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

userMoel(sequelize);
rolleModel(sequelize);

const { User, Rolle } = sequelize.models;

Rolle.hasOne(User);
User.belongsTo(Rolle);

export const models = { ...sequelize.models };

export const conn = sequelize;

export const Ops = Op;