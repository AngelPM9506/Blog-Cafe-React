const { sendMessage, setError, sendSuceess } = require("../Utils/setMessages");
const { Comment, Post, Profile } = require("../db");
const { isAdmin, itsMyComment } = require("../Utils/auth");

const CommentController = {
    getComments: async (req, res) => {
        let { post } = req.query;
        let { deToken } = req.headers;
        let condition = { include: [{ model: Profile }] };
        if (! await isAdmin(deToken) && !post) {
            return res.status(403).json(sendMessage('error', 'You need to specify the post'))
        }
        condition.where = post ? { PostId: post } : {};
        try {
            let result = await Comment.findAll(condition);
            res.status(200).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error));
        }
    },
    newComment: async (req, res) => {
        let { deToken } = req.headers;
        let { post, content } = req.body;
        if (!post || !content) {
            return res.status(404).json(sendMessage('error', 'Missing date, try again'))
        }
        try {
            let postComment = await Post.findByPk(post);
            if (!postComment) {
                return res.status(404).json(sendMessage('error', 'Post not found, trya again'))
            }
            let result = await postComment.createComment({ content, ProfileId: deToken.Profile });
            res.status(201).json(sendSuceess({ result, profile: deToken.profile }));
        } catch (error) {
            res.json(setError(error));
        }
    },
    updateComment: async (req, res) => {
        let { deToken } = req.headers;
        let { id } = req.params;
        let { content } = req.body;
        if (!await itsMyComment(deToken, id)) {
            return res.status(403).json(sendMessage('error', 'You cant edit this comment'))
        }
        if (!content) {
            return res.status(404).json(sendMessage('error', 'Missing data, try again'));
        }
        try {
            let commentToUpdate = await Comment.findByPk(id);
            let result = await commentToUpdate.update({ content });
            res.status(201).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error));
        }
    },
    deleteComment: async (req, res) => {
        let { id } = req.params;
        let { deToken } = req.headers;
        if (!await itsMyComment(deToken, id)) {
            return res.status(403).json(sendMessage('error', 'You cant delete this comment'))
        }
        try {
            let commentToDelelte = await Comment.findByPk(id);
            let result = await commentToDelelte.destroy();
            res.status(201).json(sendSuceess({ result, msg: 'Comment, has been delete succesfully' }));
        } catch (error) {
            res.json(setError(error));
        }
    }
}

module.exports = { ...CommentController };