const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { ReferalEarnings  } = require('../models');

exports.updateReferalEarnings= async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(ReferalEarnings, { _id: pararms.id }, pararms);
    return sendSuccessMessage('ReferalEarnings details successfully updated', data, res);
};
exports.deleteReferalEarnings= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(ReferalEarnings, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('ReferalEarnings details deleted successfully!', {}, res);
};

exports.getAllReferalEarnings = async (payloadData, res) => {
    let pararms = payloadData.query;

    const populates = ['brokerId'];

    let query = { isDeleted: false };

    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }

    let data = await utils.getData(ReferalEarnings, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(ReferalEarnings, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });

    return sendSuccessMessage('ReferalEarnings in getting all ratings', data, res);
};

exports.getReferalEarningsById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(ReferalEarnings, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('ReferalEarnings in getting a rating by id', data, res);
};