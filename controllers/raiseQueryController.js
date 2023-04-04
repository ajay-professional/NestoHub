const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { RaiseQuery  } = require('../models');

exports.addRaiseQuery = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data=   await utils.saveData(RaiseQuery, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.updateRaiseQuery = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(RaiseQuery, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteRaiseQuery= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(RaiseQuery, { _id: pararms.id}, { isDeleted: true }, {});
    return sendSuccessMessage('success', {}, res);
};
exports.getAllRaiseQuery = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    if(pararms.type){
        query.type = pararms.type;
    }
    let data = await utils.getData(RaiseQuery, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(RaiseQuery, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success', data, res);
};

exports.getRaiseQueryById = async (payloadData, res) => {
    const pararms = payloadData.query;
    
    const data = await utils.getData(RaiseQuery, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};