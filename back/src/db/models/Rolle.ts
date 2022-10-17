import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import {RolleAttributes, RollInput} from "../interfaces/index"

const rolleModel = (sequelize: Sequelize) => {
    class Rolle extends Model<RolleAttributes, RollInput> implements RolleAttributes {
        /**attributes */
        public id!: string;
        public rolle!: string;
        public description!: string;

        /**timestamps */
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
        public readonly deletedAT!: Date;
    }

    Rolle.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        rolle: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true
    })
}

export default rolleModel
