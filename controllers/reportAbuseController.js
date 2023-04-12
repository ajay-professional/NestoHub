const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { ReportAbuse  } = require('../models');

exports.addReportAbuse = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(ReportAbuse, pararms);
    return sendSuccessMessage('Success', data, res);
};

exports.updateReportAbuse = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    const data = await utils.updateData(ReportAbuse, { _id: pararms.id }, pararms);
    return sendSuccessMessage('ReportAbuse details successfully updated', data, res);
};
exports.deleteReportAbuse= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(ReportAbuse, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('deleted successfully!', {}, res);
};
exports.getAllReportAbuse = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId', 'communitySupportAnswersId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId =pararms.brokerId;
    }
    if(pararms.communitySupportAnswersId){
        query.communitySupportAnswersId = pararms.communitySupportAnswersId;
    }
    let data = await utils.getData(ReportAbuse, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(ReportAbuse, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all reports', data, res);
};

exports.getReportAbuseById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(ReportAbuse, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a report by id', data, res);
};