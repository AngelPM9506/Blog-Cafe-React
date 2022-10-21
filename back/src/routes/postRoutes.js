const { Router } = require("express");
const PostController = require("../controllers/PostController");
const { verifyProfile } = require("../middleware");

const routesPost = Router();

routesPost.get('/:id?', PostController.gesPosts);
routesPost.post('/', verifyProfile, PostController.newPost);
routesPost.put('/:id', verifyProfile, PostController.updatePost);
routesPost.delete('/:id', verifyProfile, PostController.deletePost);

module.exports = routesPost;