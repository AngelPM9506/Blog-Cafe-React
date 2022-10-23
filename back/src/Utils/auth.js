const cripto = require('bcryptjs');
const { User, Rolle, Profile, Post, Comment } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let { SECRET_KEY_TOKEN, SECRET_PHRASE_TOKEN } = process.env

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

const toSelectProfile = async (deToken, id) => {
    let profileFound = await Profile.findByPk(id);
    if (profileFound && (profileFound.UserId === deToken.Id)) {
        let dataNewToken = {
            ...deToken,
            Profile: profileFound.id,
            name: profileFound.name,
            alias: profileFound.alias
        };
        let token = jwt.sign(
            dataNewToken,
            JSON.stringify({ key: SECRET_KEY_TOKEN, passphrase: SECRET_PHRASE_TOKEN }) || 'BlogCafe'
        );
        return { token, dataNewToken };
    }
    return false;
}

const itsMyPost = async (deToken, id) => {
    let postFound = await Post.findByPk(id);
    if (postFound && (postFound.ProfileId === deToken.Profile || deToken.Rolle === 'Admin')) {
        return true;
    }
    return false;
}

const itsMyComment = async (deToken, id) => {
    let commentFound = await Comment.findByPk(id);
    let { Profile, Rolle } = deToken;
    //console.log({commentProfile: commentFound.ProfileId, deTokenProfile: Profile});
    if (commentFound && (commentFound.ProfileId === Profile || Rolle === 'Admin')) {
        return true;
    }
    return false
}

module.exports = {
    hashPass,
    comparePass,
    isAdmin,
    itsMyUser,
    itsMyProfile,
    toSelectProfile,
    itsMyPost,
    itsMyComment
};