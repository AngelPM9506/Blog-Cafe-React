const { setError, sendSuceess, sendMessage } = require('../Utils/setMessages')
const { Post, Profile, Category, Op } = require('../db');
const { itsMyPost } = require('../Utils/auth');

const PostController = {
    gesPosts: async (req, res) => {
        let { title } = req.query;
        let { id } = req.params;
        //console.log(req.query);
        try {
            let result;
            if (id) {
                result = await Post.findByPk(id, { include: [{ model: Profile }, { model: Category }] });
            } else {
                let condition = { include: [{ model: Profile }, { model: Category }] };
                condition.where = title ? { title: { [Op.substring]: title } } : {}
                result = await Post.findAll(condition);
            }
            if (!result || result.length === 0) {
                return res.status(404).json(sendMessage('error', 'No found any Post'));
            }
            res.status(200).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error));
        }
    },
    newPost: async (req, res) => {
        let { deToken: { Profile: ProfielId } } = req.headers;
        let { title, content, references, categories } = req.body;
        if (!title || !content || !categories) {
            return res.status(404).json(sendMessage('error', 'Missing data try again'));
        }
        try {
            let foundProfile = await Profile.findByPk(ProfielId);
            let result = await foundProfile.createPost({ title, content, references });
            await categories.forEach(async category => {
                let catfound = await Category.findOne({ where: { category } });
                await result.addCategory(catfound); //let addedCategory = await result.addCategory(catfound);
                //console.log(addedCategory);
            });
            //console.log(result);
            res.status(201).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error))
        }
    },
    updatePost: async (req, res) => {
        let { deToken } = req.headers;
        let { id } = req.params;
        let { title, content, references, addCategories, removeCategories } = req.body;
        if (! await itsMyPost(deToken, id)) {
            return res.status(403).json(sendMessage('error', 'You can\'t update this Post'));
        }
        if (!title && !content && !references && !addCategories && !removeCategories) {
            return res.status(404).json(sendMessage('error', 'Data Missing, trye again'));
        }
        //console.log(removeCategories);
        try {
            let postToUpdate = await Post.findByPk(id, { include: [{ model: Category }] });
            if (!postToUpdate) {
                return res.json(404).json(sendMessage('error', 'Post not found'))
            }
            if (addCategories) {
                await addCategories.forEach(async category => {
                    let toAdd = await Category.findOne({ where: { category } });
                    await postToUpdate.addCategory(toAdd);
                });
            }
            if (removeCategories) {
                await removeCategories.forEach(async category => {
                    let toRemove = await Category.findOne({ where: { category } });
                    await postToUpdate.removeCategory(toRemove);
                    //console.log(removed);
                });
            }
            let result = await postToUpdate.update({ title, content, references });
            return res.status(201).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error));
        }
    },
    deletePost: async (req, res) => {
        let { deToken } = req.headers;
        let { id } = req.params;
        if (! await itsMyPost(deToken, id)) {
            return req.status(403).json(sendMessage('error', 'You can\'t delete this Post'));
        }
        try {
            let postToDelete = await Post.findByPk(id);
            if (!postToDelete) return res.status(404).json(sendMessage('error', 'Post not found'));
            let result = await postToDelete.destroy();
            res.status(201).json(sendSuceess({ postDeleted: result, msg: 'Success to delete Post' }));
        } catch (error) {
            res.json(setError(error))
        }
    },
}

module.exports = PostController;