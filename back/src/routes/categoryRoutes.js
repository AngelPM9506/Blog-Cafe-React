const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");


const categoryRoutes = Router();

categoryRoutes.get('/:id?', CategoryController.getCategories);
categoryRoutes.post('/', CategoryController.newCategory)
categoryRoutes.put('/:id', CategoryController.updateCatagory);
categoryRoutes.delete('/:id', CategoryController.deleteCatagory);

module.exports = categoryRoutes;