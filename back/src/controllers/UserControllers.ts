import e, { Request, Response } from "express";
import { sendError, sendMsg } from "../utils/sendMessage";
import { models } from "../db";

const UserControllers = {
    getUsers: async (req: Request, res: Response) => {
        try {
            let result = await models.User.findAll({ include: [models.Rolle] });
            return res.status(200).json({ status: 'success', users: result })
        } catch (error: any) {
            return res.status(error.status || 505).json({ status: 'error', msg: error.message, error: error })
        }
    },
    newUser: async (req: Request, res: Response) => {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json(sendMsg('error', 'Missing Data try again'))
        }
        try {
            let defaultRolle = await models.Rolle.findOne({ where: { rolle: 'User' } });
            let result = await defaultRolle.createUser({ email, password }, { include: [models.Rolle] });
        } catch (error: any) {
            return res.json(sendError(error));
        }
    }
}

export default UserControllers;