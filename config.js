const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(`${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB:
    process.env.MONGODB ||
    "mongodb+srv://nestohub:GCZqBN5LoM2rU6I8@nestohub.ivkbsuxt.mongodb.net/?retryWrites=true&w=majority",
  JWTOKEN: process.env.JWTOKEN || "asd42e62-g465-4bc1-ae2c-da1f27kk3a20",
  S3_ACCESSKEYID: process.env.S3_ACCESSKEYID || "AKIAUBJXO2DHMX45B7XH",
  S3_SECRETACCESSKEY:
    process.env.S3_SECRETACCESSKEY ||
    "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",
};
