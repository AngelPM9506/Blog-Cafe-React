const { Router } = require("express");
const { verifyToken, verifyProfile } = require("../middleware");
const logingRoutes = require("./logingRoutes");
const profileRoutes = require("./profileRoutes");
const usersRoutes = require("./usersRoutes");
const postRoutes = require("./postRoutes");
const categoryRoutes = require("./categoryRoutes");
const commentRoutes = require("./commentRoutes");
const proyectRouter = require("./ProyectsRoutes");

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', logingRoutes);
routes.use('/profiles', verifyToken, profileRoutes);
routes.use('/posts', verifyToken, postRoutes);
routes.use('/categories', verifyToken, categoryRoutes);
routes.use('/comments', verifyToken, commentRoutes);
routes.use('/proyects', proyectRouter);

module.exports = routes;