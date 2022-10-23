const { Router } = require("express");
const { getComments, newComment, updateComment, deleteComment } = require("../controllers/CommentController");
const { verifyProfile } = require("../middleware");

const commentRoutes = Router();

commentRoutes.use(verifyProfile);

//commentRoutes.get('/:id?', getComments);
commentRoutes.get('/', getComments);
commentRoutes.post('/', newComment);
commentRoutes.put('/:id', updateComment);
commentRoutes.delete('/:id', deleteComment);

module.exports = commentRoutes;