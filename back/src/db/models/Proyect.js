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
            defaultValue: 'projects/default-img-proy.jpeg',
            allowNull: false
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
