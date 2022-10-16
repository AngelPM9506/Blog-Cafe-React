const { Router } = require("express");
const logingController = require("../controllers/LoginController");

const logingRoutes = Router();

logingRoutes.post('/login', logingController.logIn);
logingRoutes.get('/logout', logingController.logUout);

module.exports = logingRoutes;