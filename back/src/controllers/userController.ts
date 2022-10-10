import { Request, Response } from "express";

const userController = {
    getUsers: (req: Request, res: Response) => {
        res.status(201).json({ msg: 'Listo desde el controlador de users' });
    }
}

export default userController;