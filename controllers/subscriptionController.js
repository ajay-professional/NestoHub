const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Subscription  } = require('../models');

exports.addSubscription = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(Subscription, pararms);
    return sendSuccessMessage('Successfully added new subscription', data, res);
};

exports.updateSubscription = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Subscription, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Subscription details successfully updated', data, res);
};
exports.deleteSubscription= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Subscription, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('Subscription details deleted successfully!', {}, res);
};
exports.getAllSubscription = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(Subscription, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(Subscription, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all payments', data, res);
};

exports.getSubscriptionById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Subscription, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting a subscribed by id', data, res);
};


