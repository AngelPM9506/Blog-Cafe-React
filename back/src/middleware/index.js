const jwt = require('jsonwebtoken');
require('dotenv').config();
let { SECRET_KEY_TOKEN, SECRET_PHRASE_TOKEN } = process.env

const verifyToken = (req, res, next) => {
    let { authorization: beareHeader } = req.headers;
    let { logIn_BC } = req.cookies;
    beareHeader ? '' : beareHeader = logIn_BC;
    if (beareHeader) {
        req.headers.deToken = jwt.verify(beareHeader, JSON.stringify(
            {
                key: SECRET_KEY_TOKEN, passphrase: SECRET_PHRASE_TOKEN
            }) || 'BlogCafe');
        next();
    } else {
        res.status(403).json({ msg: 'You ned logIn to have acces' });
    }
}

module.exports = { verifyToken };