const { User, Rolle } = require('../db');
const { hashPass, isAdmin, itsMyUser } = require('../Utils/auth');

const setError = (error) => {
    return { status: 'error', error: error.message || error };
}

const UserController = {
    getUsers: async (req, res) => {
        let { deToken } = req.headers;
        //console.log(await isAdmin(deToken));
        if (! await isAdmin(deToken)) return res.status(403).json({ status: 'error', msg: 'Error of authentication' });
        try {
            let result = await User.findAll({ include: [Rolle], paranoid: false });
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
            let toAddUser = await Rolle.findOne({ where: { rolle: 'User' } });
            let result = await toAddUser.createUser({ email, password }, { include: [Rolle] });
            res.status(201).json({ status: 'success', user: result })
        } catch (error) {
            res.json(setError(error))
        }
    },
    getUser: async (req, res) => {
        var { id } = req.params;
        let { deToken } = req.headers;
        if (! await itsMyUser(deToken, id)) return res.status(403).json({ status: 'error', msg: 'Error of authentication' });
        try {
            let resultFind = await User.findByPk(id)
            if (!resultFind) return res.status(404).json({ status: 'error', msg: 'User not found try again or contact with the Admin' });
            let result = {};
            for (const key in resultFind.dataValues) {
                if (key === 'id' || key === 'email') {
                    result[key] = resultFind[key];
                }
            }
            res.status(200).json({ status: 'success', user: result });
        } catch (error) {
            res.json(setError(error));
        }
    },
    updateUser: async (req, res) => {
        let { email, password } = req.body;
        let { id } = req.params;
        let { deToken } = req.headers;
        if (!email && !password) return res.status(404).json({ status: 'error', msg: 'Mising data try again' });
        if (! await itsMyUser(deToken, id)) return res.status(403).json({ status: 'error', msg: 'Error of authentication' });
        try {
            password ? password = await hashPass(password) : null;
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
        let { deToken } = req.headers;
        if (! await itsMyUser(deToken, id)) return res.status(403).json({ status: 'error', msg: 'Error of authentication' });
        try {
            let result = await User.destroy({ where: { id } });
            //console.log(result);
            res.status(201).json({ status: 'success', msg: result === 1 ? 'Succes to delete' : 'Error to delete' });
        } catch (error) {
            res.json(setError(error));
        }
    },
    restoreUser: async (req, res) => {
        let { id } = req.params;
        let { deToken } = req.headers;
        if (! await isAdmin(deToken)) return res.status(403).json({ status: 'error', msg: 'Error of authentication' });
        try {
            let userToRes = await User.findByPk(id, { paranoid: false, include: [Rolle] });
            let resul = await userToRes.restore();
            res.status(201).json(resul);
        } catch (error) {
            res.json(setError(error));
        }
    }
}

module.exports = UserController;