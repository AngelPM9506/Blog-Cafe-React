
const PostController = {
    gesPosts: async (req, res) => {
        res.status(200).json({ msg: 'Todo funciona bien desde postsControllers' });
    }
}

module.exports = PostController;