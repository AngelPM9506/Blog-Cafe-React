const { Rolle, User } = require("../db");
const { hashPass } = require("./auth");

const defaultRolles = async () => {
    const rolles = [
        { rolle: 'Admin', description: 'Puede hacer cualquier cosa' },
        { rolle: 'User', description: 'Solo puede ler post y comentar' }
    ]
    try {
        let defaulCreated = await User.findAll();
        if (defaulCreated.length === 0) {
            let resuls = await Rolle.bulkCreate(rolles);
            let { dataValues: { id } } = await resuls.find(rolle => rolle.dataValues.rolle === 'Admin');
            let password = await hashPass('123456789')
            await User.create({ email: 'Admin@admin.com', password: password, RolleId: id })
            return console.log('Datos por defecto creados');
        }
        console.log('Los datos ya estaban creados');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    defaultRolles
}