const { Router } = require("express");
const UserController = require("../controllers/UserController");


const usersRoutes = Router();

usersRoutes.use('/users', [
    usersRoutes.get('/test', UserController.testUser)
])

module.exports = usersRoutes;