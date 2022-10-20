const { Router } = require("express");
const PostController = require("../controllers/PostController");

const routesPost = Router();

routesPost.get('/:is?', PostController.gesPosts);

module.exports = routesPost;