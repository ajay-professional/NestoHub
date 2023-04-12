const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { CommunitySupportAnswers  } = require('../models');

exports.addCommunitySupportAnswers = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(CommunitySupportAnswers, pararms);
    return sendSuccessMessage('Success', data, res);
};

exports.updateCommunitySupportAnswers = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    const data = await utils.updateData(CommunitySupportAnswers, { _id: pararms.id }, pararms);
    return sendSuccessMessage('CommunitySupportAnswers details successfully updated', data, res);
};

exports.deleteCommunitySupportAnswers= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(CommunitySupportAnswers, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('customer details deleted successfully!', {}, res);
};

exports.getAllCommunitySupportAnswers = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId', 'communitySupportQuestionsId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    if(pararms.communitySupportQuestionsId){
        query.communitySupportQuestionsId = pararms.communitySupportQuestionsId
    }
    let data = await utils.getData(CommunitySupportAnswers, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(CommunitySupportAnswers, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all customers', data, res);
};

exports.getCommunitySupportAnswersById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(CommunitySupportAnswers, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a customer by id', data, res);
};