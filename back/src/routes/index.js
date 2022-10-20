const { Router } = require("express");
const { verifyToken } = require("../middleware");
const logingRoutes = require("./logingRoutes");
const profileRoutes = require("./profileRoutes");
const usersRoutes = require("./usersRoutes");
const postRoutes = require("./postRoutes");
const categoryRoutes = require("./categoryRoutes");

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', logingRoutes);
routes.use('/profiles', verifyToken, profileRoutes);
routes.use('/posts', verifyToken, postRoutes);
routes.use('/categories', verifyToken, categoryRoutes);

module.exports = routes;