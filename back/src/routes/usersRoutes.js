const { Router } = require("express");
const UserController = require("../controllers/UserController");


const usersRoutes = Router();

usersRoutes.get('/', UserController.getUsers);

usersRoutes.post('/', UserController.newUser);

usersRoutes.get('/:id', UserController.getUser);

usersRoutes.put('/:id', UserController.updateUser);

usersRoutes.delete('/:id', UserController.deleteUser);


module.exports = usersRoutes;