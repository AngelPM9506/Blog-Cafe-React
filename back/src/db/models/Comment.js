const { DataTypes } = require("sequelize")


module.exports = sequelize => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaulValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            /**max content characters 255 */
        }
    })
}