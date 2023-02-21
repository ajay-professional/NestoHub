const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(`${process.env.NODE_ENV}.env`),
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB || 'mongodb://0.0.0.0:27017/prototype',
    JWTOKEN: process.env.JWTOKEN || 'asd42e62-g465-4bc1-ae2c-da1f27kk3a20',
};
