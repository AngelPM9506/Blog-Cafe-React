const { DataTypes } = require("sequelize");

module.exports = seuqelize => {
    seuqelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        references: {
            type: DataTypes.TEXT,
            defaultValue: 'own comments',
            allowNull: false
        }
    });
}