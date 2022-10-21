const { DataTypes } = require("sequelize");


module.exports = sequelize => {
    sequelize.define('Profile', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'urlOfavatar'
        }        ,
        alias: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}