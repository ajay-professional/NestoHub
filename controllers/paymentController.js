const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Payment  } = require('../models');

exports.addPayment = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data =  await utils.upsertData(Payment, { accountNumber: pararms.accountNumber, }, pararms);
    return sendSuccessMessage('Successfully ', data, res);
};

exports.updatePayment = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Payment, { _id: pararms.id }, pararms);
    return sendSuccessMessage('successfully updated', data, res);
};
exports.deletePayment= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Payment, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('deleted successfully!', {}, res);
};
exports.getAllPayment = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId','brokerId'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    let data = await utils.getData(Payment, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Payment, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful ', data, res);
};

exports.getPaymentById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['builderId','brokerId'];
    const data = await utils.getData(Payment, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful ', data, res);
};