const { Router } = require("express");
const { getComents } = require("../controllers/CommentController");

const commentRoutes = Router();

commentRoutes.get('/', getComents);

module.exports = commentRoutes;