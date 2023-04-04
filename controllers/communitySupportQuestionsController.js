const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { CommunitySupportQuestions  } = require('../models');

exports.addCommunitySupportQuestions = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    const checkQuestion = await utils.getData(CommunitySupportQuestions, {
        query: { question: pararms.question, brokerId:pararms.brokerId , isDeleted: false },
        fields: ['_id', 'question']
    });
    if (size(checkQuestion)) {
        return sendErorMessage('Question has already been asked!', {}, res);
    }
    const data = await utils.saveData(CommunitySupportQuestions, pararms);
    return sendSuccessMessage('Successfully added new Questions', data, res);
};

exports.updateCommunitySupportQuestions = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const data = await utils.updateData(CommunitySupportQuestions, { _id: pararms.id }, pararms);
    return sendSuccessMessage('CommunitySupportQuestions details successfully updated', data, res);
};

exports.deleteCommunitySupportQuestions= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(CommunitySupportQuestions, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('Questions details deleted successfully!', {}, res);
};

exports.getAllCommunitySupportQuestions = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    let data = await utils.getData(CommunitySupportQuestions, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(CommunitySupportQuestions, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all questions', data, res);
};

exports.getCommunitySupportQuestionsById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(CommunitySupportQuestions, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a Questions by id', data, res);
};



