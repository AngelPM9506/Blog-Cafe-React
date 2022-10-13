const { DataTypes } = require("sequelize");

module.exports = sequelize => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            deafultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}