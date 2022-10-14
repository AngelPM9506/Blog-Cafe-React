const { User } = require('../db');
const { hashPass } = require('../Utils/auth');

const setError = (error) => {
    return { status: 'error', error: error.message || error };
}

const UserController = {
    getUsers: async (req, res) => {
        try {
            let result = await User.findAll({ paranoid: false });
            res.status(200).json({ status: 'success', Users: result });
        } catch (error) {
            res.json(setError(error))
        }
    },
    newUser: async (req, res) => {
        let { email, password } = req.body;
        if (!email || !password) return res.status(404).json({ status: 'error', msg: 'Mising data try again' });
        try {
            password = await hashPass(password)
            let result = await User.create({ email, password });
            res.status(201).json({ status: 'success', user: result })
        } catch (error) {
            res.json(setError(error))
        }
    },
    getUser: async (req, res) => {
        let { id } = req.params;
        try {
            let result = await User.findByPk(id)
            if (!result) return res.status(404).json({ status: 'error', msg: 'Usuario no encontrado' });
            res.status(200).json(result);
        } catch (error) {
            res.json(setError(error));
        }
    },
    updateUser: async (req, res) => {
        let { email, password } = req.body;
        let { id } = req.params;
        if (!email && !password) return res.status(404).json({ status: 'error', msg: 'Mising data try again' });
        try {
            let result = await User.update({ email, password }, { where: { id } });
            if (result[0] === 0) return res.status(404).json({ status: 'error', msg: 'Error to update' })
            result = await User.findByPk(id)
            res.status(201).json({ status: 'success', user: result })
        } catch (error) {
            res.json(setError(error))
        }
    },
    deleteUser: async (req, res) => {
        let { id } = req.params;
        try {
            let result = await User.destroy({ where: { id } });
            res.status(201).json({ status: 'success', msg: result[0] === 1 ? 'Succes to delete' : 'Error to delete' });
        } catch (error) {
            res.json(setError(error))
        }
    }
}

module.exports = UserController;