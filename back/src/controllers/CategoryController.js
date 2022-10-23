const { Category, Post } = require("../db");
const { isAdmin } = require("../Utils/auth");
const { setError, sendSuceess, sendMessage } = require("../Utils/setMessages");

const CategoryController = {
    /**Obtener todas las categorias, metodo get
     * ruta api/categories
     * se puede agregar un parametro estra para solo obteter los detalles de una categoria
     * ruta api/categeories/id
     * esto retornara todos los detalles de la categoria junto con los posts en la que esta presente
     */
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
    /**la creacion de un nuevo post, metodo post 
     * ruta api/categories
     * esto creareá una nueva categoria en la base de datos
     * y retornara la informacion con id y fecha de creacion
     * es obligatoria colocar el nombre de la tegoria y su descripcion
     */
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
    /**Actualizar una nueva categora, metodo PUT
     * ruta api/categories/id
     * en este caso es necesario enviar el id como parametro para saber que categoria se actualizaŕa
     * se puede modificar tanto el nombre como la descripcion que son enviapos por el body 
     */
    updateCatagory: async (req, res) => {
        try {
            let { id } = req.params;
            let { deToken } = req.headers;
            let { category, description } = req.body;
            if (! await isAdmin(deToken)) {
                return res.status(403).json(sendMessage('error', 'Error of authentication'))
            }
            if (!category && !description) {
                return res.status(404).json(sendMessage('error', 'Missing data try again'));
            }
            let CategoryToUpdate = await Category.findByPk(id, { include: Post });
            if (!CategoryToUpdate) {
                return res.status(404).json(sendMessage('error', 'Category not be founded'));
            }
            let result = await CategoryToUpdate.update({ category, description })//Category.update({ category, description }, { where: { id } })
            res.status(201).json(sendSuceess(result))
        } catch (error) {
            res.json(setError(error));
        }
    },
    /**Eliminar una categoria, motodo delete
     * ruta api/categories/id
     * en este caso igualmente se manda por parametro el id de la categoria
     */
    deleteCatagory: async (req, res) => {
        let { deToken } = req.headers;
        if (! await isAdmin(deToken)) {
            return res.status(403).json(sendMessage('error', 'Error of authentication'))
        }
        let { id } = req.params;
        try {
            let categoryToDelete = await Category.findByPk(id, { include: Post });
            let result = await categoryToDelete.destroy();
            res.status(201).json(sendSuceess({ categoryDelete: result, msg: 'Success to delete category' }));
        } catch (error) {
            res.json(setError(error))
        }
    },

}

module.exports = CategoryController;