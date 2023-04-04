const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { QueryChat} = require('../models');

exports.addQueryChat = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const checkEmail = await utils.getData(QueryChat, {
        query: { email: pararms.email, brokerId:pararms.brokerId , isDeleted: false },
        fields: ['_id']
    });
    if (size(checkEmail)) {
        return sendErorMessage('The customer with this email is already registered with us for this broker.', {}, res);
    }
    const data = await utils.saveData(QueryChat, pararms);
    return sendSuccessMessage('Successfully added new customer', data, res);
};

exports.updateQueryChat = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const data = await utils.updateData(QueryChat, { _id: pararms.id }, pararms);
    return sendSuccessMessage('QueryChat. details successfully updated', data, res);
};
exports.deleteQueryChat= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(QueryChat, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('customer details deleted successfully!', {}, res);
};
exports.getAllQueryChat = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    let data = await utils.getData(QueryChat, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(QueryChat, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all customers', data, res);
};

exports.getQueryChatById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(QueryChat, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a customer by id', data, res);
};