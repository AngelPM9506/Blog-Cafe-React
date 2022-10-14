const { Router } = require("express");
const logingRoutes = require("./logingRoutes");
const usersRoutes = require("./usersRoutes");


const routes = Router();

routes.use('/api', [
    routes.use('/users', usersRoutes),
    routes.use('/auth', logingRoutes)
]);

module.exports = routes;