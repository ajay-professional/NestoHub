const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const env = require('./config');

global.APP_PATH = path.resolve(__dirname);
global.Joi = require('joi');
const logger = require('./helpers/logger');
const routes = require('./routes');

logger.info(env.NODE_ENV);
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(env.MONGODB, { useNewUrlParser: true }, (err) => {
    if (err) {
        logger.info('MongoDb not connected====', err);
    } else {
        logger.info('you are connected to MongoDb');
    }
});
mongoose.connection.on('error', (err) => {
    logger.info('Mongdb connection failed due to error : ', err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(upload());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '300mb', extended: true }));
app.use(bodyParser.urlencoded({
    limit: '100mb', extended: true, parameterLimit: 1000000,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use('/api/v1/', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.options('/*', cors());

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.info(err);
    res.status(err.status || 500);
});

//app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
