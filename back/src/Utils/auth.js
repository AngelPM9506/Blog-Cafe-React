const cripto = require('bcryptjs');

const hashPass = async (pass) => {
    try {
        let salt = await cripto.genSalt(10);
        let passHashed = await cripto.hash(pass, salt)
        //console.log({ salt: salt, pass: passHashed });
        return passHashed
    } catch (error) {
        return error;
    }
}

const comparePass = async (pass, resgisterPass) => {
    try {
        let samePass = await cripto.compare(pass, resgisterPass);
        //console.log(samePass);
        return samePass;
    } catch (error) {
        return error;
    }
}

module.exports = {
    hashPass,
    comparePass
};