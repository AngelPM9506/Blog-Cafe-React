const { DataTypes } = require("sequelize")

module.exports = seuqelize => {
    seuqelize.define('Rolle', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
        },
        rolle: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    }, { paranoid: true })
}