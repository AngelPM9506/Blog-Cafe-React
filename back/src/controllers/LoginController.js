const { User, Rolle } = require("../db");
const { comparePass } = require("../Utils/auth");
const { setError } = require("../Utils/setMessages");
const jwt = require('jsonwebtoken');

const logingController = {
    logIn: async (req, res) => {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ status: 'error', msg: 'Missing data try again ' });
        }
        try {
            let user = await User.findOne({ where: { email }, include: [Rolle] });
            if (!user) {
                return res.status(404).json({ status: 'error', msg: 'User unfound trya gain' })
            }
            if (!await comparePass(password, user.password)) {
                return res.status(403).json({ status: 'error', msg: 'Password invalid tryagain' })
            }
            //let {email}
            //let dataToken = {}
                res.status(200).json({ status: 'success', user });
        } catch (error) {
            res.json(setError(error))
        }
    }
}

module.exports = logingController;