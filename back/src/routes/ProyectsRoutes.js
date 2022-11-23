const { Router } = require("express");
const { getProyects, newProyect, updateProyect, deleteProyect } = require("../controllers/ProyectsController");
const { verifyToken } = require("../middleware");

const ProyectRouter = Router();

ProyectRouter.get('/:id?', getProyects);
ProyectRouter.post('/', verifyToken, newProyect);
ProyectRouter.put('/:id', verifyToken, updateProyect);
ProyectRouter.delete('/:id', verifyToken, deleteProyect);

module.exports = ProyectRouter;