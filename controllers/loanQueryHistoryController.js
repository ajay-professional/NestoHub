const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { LoanQueryHistory, LoanQueryDetails  } = require('../models');

exports.addLoanQueryHistory = async (payloadData, res) => {
    const pararms = payloadData.body;
    const checkName = await utils.getData(LoanQueryHistory, {
        query: { name:pararms.name, isDeleted: false },
        fields: ['_id']
    });
    const data = await utils.saveData(LoanQueryHistory, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};

exports.updateLoanQueryHistory = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(LoanQueryHistory, { _id: pararms.id }, pararms);
    return sendSuccessMessage('loanQueryHistory details successfully updated', data, res);
};
exports.deleteLoanQueryHistory= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(loanQueryHistory, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllLoanQueryHistory = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    const data = await utils.getData(LoanQueryHistory, {
        query:query,
    });
    return sendSuccessMessage('success', data, res);
};

exports.getLoanQueryHistoryById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(LoanQueryHistory, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};

exports.loanQueryAnalysis = async (payloadData, res) => {
    const pararms = payloadData.query;

    const countTotal  = await utils.countDocuments(LoanQueryHistory,{dsaId:pararms.id});
    const countAccepted  = await utils.countDocuments(LoanQueryHistory,{dsaId:pararms.id,status:"accepted"});
    const countDeclined  = await utils.countDocuments(LoanQueryHistory,{dsaId:pararms.id,status:"declined"});
    const countPending = await utils.countDocuments(LoanQueryDetails,{dsaId:pararms.id,queryStatus:"pending"});

    let total = countTotal+countPending;
    
    let data = {
        accepted :countAccepted/total*100,
        declined :countDeclined/total*100,
        pending :countPending/total*100
    }
    return sendSuccessMessage('success', data, res);
}