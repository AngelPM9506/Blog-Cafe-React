import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import DB from '../database'

interface UserAttributes {
    id: Number;
    email: String;
    password: String;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOuput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public email!: String;
    public password!: String;
    /**timpos */
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}


const userInit = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true
    })
}

// User.init({
//     id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     timestamps: true,
//     sequelize: DB.conn,
//     paranoid: true
// })

export default userInit;