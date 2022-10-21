const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { sendMessage } = require('../Utils/setMessages');
require('dotenv').config();
let { SECRET_KEY_TOKEN, SECRET_PHRASE_TOKEN } = process.env

const verifyToken = async (req, res, next) => {
    let { authorization: beareHeader } = req.headers;
    let { logIn_BC } = req.cookies;
    beareHeader ? '' : beareHeader = logIn_BC;
    if (beareHeader) {
        let decodeToken = jwt.verify(beareHeader, JSON.stringify(
            {
                key: SECRET_KEY_TOKEN, passphrase: SECRET_PHRASE_TOKEN
            }) || 'BlogCafe')
        let userVerifed = await User.findByPk(decodeToken.Id);
        if (!userVerifed) return res.status(403).json(sendMessage('error', 'You ned logIn to have acces'));
        //console.log(userVerifed);
        req.headers.deToken = decodeToken;
        next();
    } else {
        res.status(403).json(sendMessage('error', 'You ned logIn to have acces'));
    }
}

const verifyProfile = async (req, res, next) => {
    let { deToken } = req.headers;
    if (deToken.hasOwnProperty('Profile')) {
        return next();
    }
    res.status(403).json(sendMessage('error', 'To continue first select one of your profiles'))
}

module.exports = {
    verifyToken,
    verifyProfile
};