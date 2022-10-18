const { Router } = require("express");
const { verifyToken } = require("../middleware");
const logingRoutes = require("./logingRoutes");
const profileRoutes = require("./profileRoutes");
const usersRoutes = require("./usersRoutes");


const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', logingRoutes);
routes.use('/profiles', verifyToken, profileRoutes);

module.exports = routes;