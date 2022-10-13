const { Router } = require("express");
const usersRoutes = require("./usersRoutes");


const routes = Router();

routes.use('/api', [
    usersRoutes
]);

module.exports = routes;