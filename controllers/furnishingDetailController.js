const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { FurnishingDetail  } = require('../models');

exports.addFurnishingDetail = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data=   await utils.saveData(FurnishingDetail, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.updateFurnishingDetail = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(FurnishingDetail, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteFurnishingDetail= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(FurnishingDetail, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ], {});
    return sendSuccessMessage('success', {}, res);
};
exports.getAllFurnishingDetail = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(FurnishingDetail, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });

    const count  = await utils.countDocuments(FurnishingDetail,query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => {v.totalCount = count});
    return sendSuccessMessage('success', data, res);
};

exports.getFurnishingDetailById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(FurnishingDetail, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};