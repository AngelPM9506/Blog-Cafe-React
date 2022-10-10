import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from "./routes";

/**declaracion del servidor */
const server: Express = express();

/**uso de middlewares */
server.use(urlencoded({ extended: true, limit: '1023mb' }));
server.use(json({ limit: '1023mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/**declaracion de las rutas */
server.use('/', router)

/**captura de errores */
const errorCapture: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status(status).json({ msg: message, error: err })
}

server.use(errorCapture);

/**exportar el servidor */
export default server;