const { sendMessage } = require("../Utils/setMessages");


const CommentController = {
    getComents: async (req, res) => {
        res.status(200).json(sendMessage('success', 'Todo listo para comenzar'));
    }
}

module.exports = { ...CommentController };