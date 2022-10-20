const { Category, Post } = require("../db");
const { isAdmin } = require("../Utils/auth");
const { setError, sendSuceess, sendMessage } = require("../Utils/setMessages");

const CategoryController = {
    getCategories: async (req, res) => {
        let { id } = req.params;
        try {
            let result = id
                ? await Category.findByPk(id, { include: [{ model: Post }] })
                : await Category.findAll({ include: [{ model: Post }] });
            res.status(200).json(result ? sendSuceess(result) : sendMessage('error', 'Category not be founded'));
        } catch (error) {
            res.json(setError(error));
        }
    },
    newCategory: async (req, res) => {
        let { deToken } = req.headers;
        if (! await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'Error of authentication'))
        }
        let { category, description } = req.body;
        if (!category || !description) {
            return res.status(404).json(sendMessage('error', 'Missing data try again'));
        }
        try {
            let newCategory = { category, description };
            let resul = await Category.create(newCategory);
            res.status(201).json(sendSuceess(resul));
        } catch (error) {
            res.json(setError(error));
        }
    },
    updateCatagory: async (req, res) => {
        try {
            let { id } = req.params;
            let { deToken } = req.headers;
            let { category, description } = req.body;
            if (! await isAdmin(deToken)) {
                return res.status(403).json(sendMessage('error', 'Error of authentication'))
            }
            let CategoryToUpdate = await Category.findByPk(id, { include: Post });
            if (!CategoryToUpdate) {
                return res.status(404).json(sendMessage('error', 'Category not be founded'));
            }
            if (!category && !description) {
                return res.status(404).json(sendMessage('error', 'Missing data try again'));
            }
            let result = await CategoryToUpdate.update({ category, description })//Category.update({ category, description }, { where: { id } })
            res.status(201).json(sendSuceess(result))
        } catch (error) {
            res.json(setError(error));
        }
    },
    deleteCatagory: async (req, res) => {
        let { deToken } = req.headers;
        if (! await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'Error of authentication'))
        }
        let { id } = req.params;
        try {
            let categoryToDelete = await Category.findByPk(id, { include: Post });
            let result = await categoryToDelete.destroy();
            res.status(201).json(sendSuceess({categoryDelete: result, msg: 'Success to delete category'}));
        } catch (error) {
            res.json(setError(error))
        }
    },

}

module.exports = CategoryController;