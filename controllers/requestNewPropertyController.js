const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { RequestNewProperty  } = require('../models');

exports.addRequestNewProperty = async (payloadData, res) => {
    const pararms = payloadData.body;

    const data=   await utils.saveData(RequestNewProperty, pararms);
    return sendSuccessMessage('Successfully added new requestProperty', data, res);
};

exports.updateRequestNewProperty = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(RequestNewProperty, { _id: pararms.id }, pararms);
    return sendSuccessMessage('RequestNewProperty details successfully updated', data, res);
};
exports.deleteRequestNewProperty= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(RequestNewProperty, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ], {});
    return sendSuccessMessage('requestProperty details deleted successfully!', {}, res);
};
exports.getAllRequestNewProperty = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    let data = await utils.getData(RequestNewProperty, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(RequestNewProperty, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all requestPropertys', data, res);
};

exports.getRequestNewPropertyById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['builderId'];
    const data = await utils.getData(RequestNewProperty, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a requestProperty by id', data, res);
};