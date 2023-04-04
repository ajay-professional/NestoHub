const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Transaction  } = require('../models');

exports.addTransaction = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.invoiceId = toLower(pararms.invoiceId);
    const checkTransaction = await utils.getData(Transaction, {
        query: { invoiceId:pararms.invoiceId ,isDeleted: false },
        fields: ['_id']
    });
    if (size(checkTransaction)) {
        return sendErorMessage('Transaction for this Broker Already Exist.', {}, res);
    }
    const data=   await utils.saveData(Transaction, pararms);
    return sendSuccessMessage('Successfully added new transaction', data, res);
};

exports.updateTransaction = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const data = await utils.updateData(Transaction, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Transaction details successfully updated', data, res);
};
exports.deleteTransaction= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Transaction, { _id: pararms.id}, { isDeleted: true }, {});
    return sendSuccessMessage('transaction details deleted successfully!', {}, res);
};
exports.getAllTransaction = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId','invoiceId'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    const data = await utils.getData(Transaction, {
        query:query,
        populates,
    });
    return sendSuccessMessage('successful in getting all transactions', data, res);
};

exports.getTransactionById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['builderId'];
    const data = await utils.getData(Transaction, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a transaction by id', data, res);
};