const { NODE_ENV, DB_USER, DB_PASS, DB_BD, DB_HOST, DB_DRIVER } = require('dotenv').config().parsed;
const { Sequelize, Op, DataTypes } = require('sequelize');
const modelUser = require('./models/User');
const modelRolle = require('./models/Rolle');
const modelProfile = require('./models/Profile');
const modelPost = require('./models/Post');
const modelCategory = require('./models/Category');
const modelComment = require('./models/Comment');

const sequelize = NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_BD,
        dialect: DB_DRIVER,
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASS,
        pool: {
            max: 3,
            min: 1,
            idle: 100000
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            keepAlive: true
        },
        ssl: true
    })
    : new Sequelize(`${DB_DRIVER}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_BD}`, {
        logging: false,
        native: false
    });

/**inicializar modelos */
modelUser(sequelize);
modelRolle(sequelize);
modelProfile(sequelize);
modelPost(sequelize);
modelCategory(sequelize);
modelComment(sequelize);

/**relacion entre tablas*/
const { User, Rolle, Profile, Post, Category, Comment } = sequelize.models;

/**un usuario tiene un roll */
Rolle.hasOne(User, {
    foreignKey: { type: DataTypes.UUID },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
User.belongsTo(Rolle);

/**un usuario puede crear hasta tres perfiles */
User.hasMany(Profile, {
    foreignKey: { type: DataTypes.UUID },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Profile.belongsTo(User);

/**un perfil puede crear muchos post*/
Profile.hasMany(Post, {
    foreignKey: { type: DataTypes.UUID },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});
Post.belongsTo(Profile);

/**un Post puede tener muchas categorias y una categoria puede tener muchos post  */
Post.belongsToMany(Category, {
    through: 'Post-Category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Category.belongsToMany(Post, {
    through: 'Post-Category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

/**un comentario es creado por un Perfil y pertenece a un post 
 * un post puede tener muchos comentarios 
 * un Profile pude crear muchos comentrarios
*/
Profile.hasMany(Comment, {
    foreignKey: { type: DataTypes.UUID },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
})
Post.hasMany(Comment, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
})

Comment.belongsTo(Profile);
Comment.belongsTo(Post);

/**exportar modulo */
module.exports = {
    ...sequelize.models,
    conn: sequelize,
    Op
}