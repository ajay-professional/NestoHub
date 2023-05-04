const Jwt = require('jsonwebtoken');
const { toLower, size } = require('lodash');
const moment = require('moment');
const { Admin } = require('../models');
const commonHelper = require('../helpers/common');
const utils = require('../utils/apiHelper');
const env = require('../config');
const privateKey = env.JWTOKEN;

const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');


exports.login = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkUsername = await utils.getData(Admin, {
        query: {
            username: pararms.username,
            isDeleted: false,
        }
    });
    if (!size(checkUsername)) {
        return sendErorMessage('Wrong Username', {}, res);
    }

    const checkPasswordBoolean = await commonHelper.comparePassword(pararms.password, checkUsername[0].password);
    if (!checkPasswordBoolean) return sendErorMessage('Password is not valid.', {}, res);
    const tokenData = {
        _id: checkUsername[0]._id
    };
    const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
    return sendSuccessMessage('success', {
        token:token
    }, res);
};

