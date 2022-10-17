import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import routes from './routes';
dotenv.config();

/**varial to work de server */
const { ALLOW_ORIGIN } = process.env;
const app: Express = express();
const opCors: CorsOptions = {
    origin: ALLOW_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Authorization',
        'X-API-KEY',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Access-Control-Allow-Request-Method'
    ]
}

/**middlewears */
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(opCors));

/**ruutes */

app.use('/api', routes);

export default app;