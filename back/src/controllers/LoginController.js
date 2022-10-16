const { User, Rolle } = require("../db");
const { comparePass } = require("../Utils/auth");
const { setError } = require("../Utils/setMessages");
const jwt = require('jsonwebtoken');
require('dotenv').config();
let { SECRET_KEY_TOKEN, SECRET_PHRASE_TOKEN } = process.env

const logingController = {
    logIn: async (req, res) => {
        /**obtener datos */
        let { email, password } = req.body;
        /**confirmar que los datos se recibieron */
        if (!email || !password) {
            return res.status(404).json({ status: 'error', msg: 'Missing data try again ' });
        }
        try {
            /**confirmar que el usuario exista */
            let user = await User.findOne({ where: { email }, include: [Rolle] });
            if (!user) {
                return res.status(404).json({ status: 'error', msg: 'User unfound trya gain' })
            }
            /**comparar la contraseña que se envia con la guardada */
            if (!await comparePass(password, user.password)) {
                return res.status(403).json({ status: 'error', msg: 'Password invalid tryagain' })
            }
            /**crear un token de verificaion */
            let { email: userEmail, id, Rolle: { rolle } } = user;
            //console.log({ Id: id, Email: userEmail, Rolle: rolle });
            let dataToken = { Id: id, Email: userEmail, Rolle: rolle };
            let token = jwt.sign(
                dataToken,
                JSON.stringify({ key: SECRET_KEY_TOKEN, passphrase: SECRET_PHRASE_TOKEN }) || 'BlogCafe',
                { expiresIn: '30d' }
            );
            console.log(JSON.stringify({ key: SECRET_KEY_TOKEN, passphrase: SECRET_PHRASE_TOKEN }));
            /**retornar el token */
            res.status(200).cookie('logIn_BC', `${token}`).json({ status: 'success', token: token });
        } catch (error) {
            res.json(setError(error))
        }
    },
    logUout: async (req, res) => {
        res.clearCookie('logIn_BC').json({status: 'succes', msg: 'logOut successfuly see you...'});
    }
}

module.exports = logingController;