const { Rolle, User } = require("../db");
const { hashPass } = require("./auth");

const defaultRolles = async () => {
    const rolles = [
        { rolle: 'Admin', description: 'Puede organizar grupos' },
        { rolle: 'User', description: 'Solo puede ler post y comentar' }
    ]
    try {
        let resuls = await Rolle.bulkCreate(rolles);
        let { dataValues: { id } } = await resuls.find(rolle => rolle.dataValues.rolle === 'Admin');
        let password = await hashPass('123456789')
        let userDefault = await User.create({ email: 'ejemplo@ejemplo.com', password: password, RolleId: id })
        console.log('Datos por defecto creados');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    defaultRolles
}