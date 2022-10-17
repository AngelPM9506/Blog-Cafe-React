import { models } from "../db";
import { RollInput, UserInput } from "../db/interfaces";


export const defaultValues = async () => {
    const defaultRolles: RollInput[] = [
        { rolle: 'Admin', description: 'User admin can do anything' },
        { rolle: 'User', description: 'User as user only can coment and send messages' }
    ];

    try {
        let results = await models.Rolle.bulkCreate(defaultRolles);

        let adminRole = results.find(rolle => {
            if (rolle.getDataValue('rolle') === 'Admin') {
                return rolle;
            }
        });

        const defaultUser: UserInput = {
            email: 'admin@admin.com',
            password: '123456',
            RolleId: adminRole.getDataValue('id')
        };

        await models.User.create(defaultUser);

        console.log('User default created');
    } catch (error: any) {
        console.log(error);
    }
}