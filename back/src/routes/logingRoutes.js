const { Router } = require("express");
const logingController = require("../controllers/LoginController");

const logingRoutes = Router();

logingRoutes.post('/login', logingController.logIn);

module.exports = logingRoutes;