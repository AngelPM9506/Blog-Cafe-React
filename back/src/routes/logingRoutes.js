const { Router } = require("express");
const logingController = require("../controllers/LoginController");
const { verifyToken } = require("../middleware");

const logingRoutes = Router();

logingRoutes.post('/login', logingController.logIn);
logingRoutes.get('/logout', verifyToken, logingController.logUout);

module.exports = logingRoutes;