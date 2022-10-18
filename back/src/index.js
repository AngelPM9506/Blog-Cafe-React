const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

/**declare server of express */
const app = express();

/**declare corsoptions */
const corsOption = {
    origin: process.env.ALLOW_ORIGIN || '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
    ],
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


/**parse url an body to json */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**parse cookies */
app.use(cookieParser());
/**get info by console */
app.use(morgan('dev'));
/**set corrs */
app.use(cors(corsOption));


/**set routes */
// app.get('/welcom', (req, res) => {
//     res.status(200).json({ msg: 'wellcom to api blog coffe' })
// })
app.use('/api', routes);

/**catch errors */
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 505).json({ status: 'error', msg: error.message || error })
})

module.exports = app;