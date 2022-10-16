const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { verifyToken } = require("../middleware");


const usersRoutes = Router();

usersRoutes.get('/', verifyToken, UserController.getUsers);

usersRoutes.post('/', UserController.newUser);

usersRoutes.get('/:id', verifyToken, UserController.getUser);

usersRoutes.put('/:id', verifyToken, UserController.updateUser);

usersRoutes.patch('/:id', verifyToken, UserController.restoreUser);

usersRoutes.delete('/:id', verifyToken, UserController.deleteUser);


module.exports = usersRoutes;