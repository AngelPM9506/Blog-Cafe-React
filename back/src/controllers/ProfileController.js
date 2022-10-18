const { Profile, User } = require('../db');
const { itsMyUser, itsMyProfile } = require('../Utils/auth');
const { setError, sendMessage, sendSuceess } = require('../Utils/setMessages');

/** \/profile?myProfiles=true */
const ProfileController = {
    /**obter todos los perfiles */
    getProfilles: async (req, res) => {
        let { myProfiles } = req.query;
        let { deToken } = req.headers;
        let { id } = req.params;
        let condition = { include: { model: User } };
        if (id) {
            condition = { ...condition, where: { id } };
        } else if (myProfiles) {
            condition = { ...condition, where: { UserId: deToken.Id } };
        }
        try {
            let allProfiles = await Profile.findAll(condition);
            res.status(200).json({ status: 'success', allProfiles: allProfiles });
        } catch (error) {
            res.json(setError(error))
        }
    },
    /**crear un nuevo perfil */
    newProfile: async (req, res) => {
        let { name, surname, alias, description, birthDate } = req.body;
        let { deToken } = req.headers;
        if (!name || !surname || !alias || !birthDate) {
            return res.status(404).json(sendMessage('error', 'Missing data try again'));
        }
        let newProfiele = {
            name,
            surname,
            alias,
            description,
            birthDate: new Date(birthDate)
        };
        try {
            let user = await User.findByPk(deToken.Id, { include: [{ model: Profile }] });
            if (user.Profiles.length >= 3) {
                return res.status(403).json(sendMessage('error', 'You ned delete a profile to meke another one'))
            }
            let result = await user.createProfile(newProfiele)
            res.status(201).json(sendSuceess(result));
        } catch (error) {
            res.json(setError(error))
        }
    },
    /**actualizar un perfil */
    updateProfile: async (req, res) => {
        let { id } = req.params;
        let { deToken } = req.headers;
        let { name, surname, alias, description } = req.body;
        //console.log(itsMyProfile(deToken, id));
        if (! await itsMyProfile(deToken, id)) {
            return res.status(403).json(sendMessage('error', "You can't Update this profile"))
        }
        if (!name && !surname && !alias && !description) {
            return res.status(404).json(sendMessage('error', 'Missing data try again'))
        }
        let result = await Profile.update({ name, surname, alias, description }, { where: { id } });
        if (result[0] === 0) return res.status(404).json(sendMessage('error', 'Error to Update'));
        result = await Profile.findByPk(id, { include: { model: User } });
        res.status(201).json(sendSuceess(result))
    },
    /**eliminar un perfil */
    deleteProfile: async (req, res) => {
        let { id } = req.params;
        let { deToken } = req.headers;
        //console.log(itsMyProfile(deToken, id));
        if (! await itsMyProfile(deToken, id)) {
            return res.status(403).json(sendMessage('error', "You can't Delete this profile"))
        }
        let resul = await Profile.destroy({ where: { id } });
        res.status(201).json({
            status: resul === 1 ? 'succes' : 'error',
            msg: resul === 1 ? 'Profile delete succesfuly' : 'Error to delete Profile'
        })
    }
}

module.exports = ProfileController;