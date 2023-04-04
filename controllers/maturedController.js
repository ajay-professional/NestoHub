const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Matured  } = require('../models');

exports.addMatured = async (payloadData, res) => {
    const pararms = payloadData.body;
    const checkName = await utils.getData(Matured, {
        query: { name:pararms.name, isDeleted: false },
        fields: ['_id']
    });
    if (size(checkName)) {
        return sendErorMessage('Matured already exists!', {}, res);
    }
    const data = await utils.saveData(Matured, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};

exports.updateMatured = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Matured, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Matured details successfully updated', data, res);
};
exports.deleteMatured= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Matured, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllMatured = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(Matured, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(Matured, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success', data, res);
};

exports.getMaturedById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Matured, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};