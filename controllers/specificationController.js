const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Specification  } = require('../models');

exports.addSpecification = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data=   await utils.saveData(Specification, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.updateSpecification = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Specification, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteSpecification= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Specification, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ], {});
    return sendSuccessMessage('success', {}, res);
};
exports.getAllSpecification = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(Specification, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });

    const count  = await utils.countDocuments(Specification,query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => {v.totalCount = count});
    return sendSuccessMessage('success', data, res);
};

exports.getSpecificationById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Specification, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};