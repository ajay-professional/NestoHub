const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const {  FaqAndSupport  } = require('../models');



exports.addFaqAndSupport = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    const checkQuestion = await utils.getData( FaqAndSupport, {
        query: { question: pararms.question, isDeleted: false },
        fields: ['_id', 'question']
    });
    if (size(checkQuestion)) {
        return sendErorMessage('Question has already been asked!', {}, res);
    }
    const data = await utils.saveData( FaqAndSupport, pararms);
    return sendSuccessMessage('Successfully added new  FaqAndSupport', data, res);
};

exports.updateFaqAndSupport = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData( FaqAndSupport, { _id: pararms.id }, pararms);
    return sendSuccessMessage(' FaqAndSupport details successfully updated', data, res);
};

exports.deleteFaqAndSupport= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData( FaqAndSupport, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage(' FaqAndSupport details deleted successfully!', {}, res);
};

exports.getAllFaqAndSupport = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    if(pararms.search){
        query.question = { $regex: pararms.search, $options: "i" };
    }
    if(pararms.type){
        query.type = pararms.type;
    }
    if(pararms.for){
        query.for =pararms.for;
    }
    let data = await utils.getData( FaqAndSupport, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(FaqAndSupport, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all questions', data, res);
};

exports.getFaqAndSupportById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData( FaqAndSupport, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting a  FaqAndSupport by id', data, res);
};