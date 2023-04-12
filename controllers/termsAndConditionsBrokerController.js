const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { TermsAndConditionsBroker } = require('../models');
let S3 = require("../helpers/s3/index")({
    aws_s3: {
      accessKey: env.S3_ACCESSKEYID,
      accessKeyId: env.S3_ACCESSKEYID,
      secretAccessKey: env.S3_SECRETACCESSKEY,
      region: "ap-south-1",
      bucket: "nestohub",
    },
});

exports.addTermsAndConditionsBroker = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(TermsAndConditionsBroker, pararms);
    return sendSuccessMessage('Successfully added new  TermsAndConditionsBroker', data, res);
};

exports.updateTermsAndConditionsBroker = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(TermsAndConditionsBroker, { _id: pararms.id }, pararms);
    return sendSuccessMessage(' TermsAndConditionsBroker details successfully updated', data, res);
};

exports.deleteTermsAndConditionsBroker = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(TermsAndConditionsBroker, { _id: pararms.id }, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage(' TermsAndConditionsBroker details deleted successfully!', {}, res);
};

exports.getAllTermsAndConditionsBroker = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(TermsAndConditionsBroker, {
        query: query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(TermsAndConditionsBroker, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all tutorials', data, res);
};

exports.getTermsAndConditionsBrokerById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(TermsAndConditionsBroker, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting TermsAndConditionsBroker by id', data, res);
};