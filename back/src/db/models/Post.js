const { DataTypes } = require("sequelize");

module.exports = seuqelize => {
    seuqelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        title: {
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
            defaultValue: 'My opinion',
            allowNull: false
        }, 
        picture: {
            type: DataTypes.STRING
        }
    });
}