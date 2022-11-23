const { DataTypes } = require("sequelize");


module.exports = seuqelize => {
    seuqelize.define('Proyect', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: 'imagen defaul de un proyecto'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gitrepo: {
            type: DataTypes.STRING
        },
        deployurl: {
            type: DataTypes.STRING
        }
    });
} 
