import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { UserAttributes, UserInput } from "../interfaces";

const userMoel = (sequelize: Sequelize) => {
    class User extends Model<UserAttributes, UserInput> implements UserAttributes {
        /**atributes */
        public id!: string;
        public email!: string;
        public password: string;

        /**timestamps */
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
        public readonly deteledAt!: Date;

    }
    return User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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

export default userMoel;