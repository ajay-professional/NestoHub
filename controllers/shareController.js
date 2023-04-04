const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Share  } = require('../models');

exports.addShare = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const data = await utils.saveData(Share, pararms);
    return sendSuccessMessage('Success', data, res);
};

exports.deleteShare= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Share, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllShare = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId', 'propertyId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    if(pararms.propertyId){
        query.propertyId = pararms.propertyId
    }
    let data = await utils.getData(Share, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Share, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success!', data, res);
};

exports.getShareById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['propertyId', 'brokerId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    if(pararms.propertyId){
        query.propertyId = pararms.propertyId
    }
    const data = await utils.getData(Share, {
        query:query,
        populates,
    });
    return sendSuccessMessage('successful in getting share by id', data, res);
};