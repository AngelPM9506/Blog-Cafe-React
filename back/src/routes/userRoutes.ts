import { Request, Response, Router } from "express";
import UserControllers from "../controllers/UserControllers";


const userRoutes = Router();

userRoutes.get('/', UserControllers.getUsers);

export default userRoutes;