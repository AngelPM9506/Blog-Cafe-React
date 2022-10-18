const cripto = require('bcryptjs');
const { User, Rolle, Profile } = require('../db');

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

const isAdmin = async (deToken) => {
    let condition = { where: { id: deToken.Id }, include: [Rolle] };
    let userFound = await User.findOne(condition);
    if (userFound && userFound.Rolle.rolle === 'Admin') {
        return true;
    }
    return false;
}

const itsMyUser = async (deToken, id) => {
    let userFound = await User.findByPk(deToken.Id);
    //console.log(userFound);
    if (userFound && (id === userFound.id || deToken.Rolle === 'Admin')) {
        return true;
    }
    return false;
}

const itsMyProfile = async (deToken, id) => {
    let profileFound = await Profile.findByPk(id);
    // console.log(profileFound.UserId);
    // console.log(deToken.Id);
    // console.log(profileFound.UserId === deToken.Id);
    // console.log(deToken.Rolle === 'Admin');
    if (profileFound && (profileFound.UserId === deToken.Id || deToken.Rolle === 'Admin')) {
        return true;
    }
    return false;
}

module.exports = {
    hashPass,
    comparePass,
    isAdmin,
    itsMyUser,
    itsMyProfile
};