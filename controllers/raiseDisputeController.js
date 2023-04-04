const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { RaiseDispute  } = require('../models');

exports.addRaiseDispute = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data=   await utils.saveData(RaiseDispute, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.updateRaiseDispute = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(RaiseDispute, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteRaiseDispute= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(RaiseDispute, { _id: pararms.id}, { isDeleted: true }, {});
    return sendSuccessMessage('success', {}, res);
};
exports.getAllRaiseDispute = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId','visitId'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    if(pararms.visitId){
        query.visitId = pararms.visitId
    }
    let data = await utils.getData(RaiseDispute, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(RaiseDispute, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success', data, res);
};

exports.getRaiseDisputeById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['builderId','visitId'];
    const data = await utils.getData(RaiseDispute, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success', data, res);
};