const { toLower, size, groupBy, chain } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Invoice } = require('../models');

exports.addInvoice = async (payloadData, res) => {

    const pararms = payloadData.body;
    const data = await utils.saveData(Invoice, pararms);
    pararms.paymentDate = new Date().toString();
    return sendSuccessMessage('Successfully added new invoice', data, res);
};

exports.updateInvoice = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Invoice, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Invoice details successfully updated', data, res);
};

exports.updateStatusForInvoice = async (payloadData, res) => {
    const pararms = payloadData.body;
    const checkInvoice = await utils.getSingleData(Invoice, {
        query: { _id: pararms.id, isDeleted: false },
    });
    if (checkInvoice.status == "settled") {
        return sendErorMessage('Invoice is already settled by you', {}, res);
    }
    const data = await utils.updateData(Invoice, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Invoice details successfully updated', data, res);
};

exports.deleteInvoice = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Invoice, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('invoice details deleted successfully!', {}, res);
};

exports.getAllInvoice = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['brokerId', 'builderId', {
        path: 'claimId',
        model: 'claim',
        populate: [
            {
                path: 'propertyId',
                model: 'property',
                match: {}
            }]
    }];
    let query = { isDeleted: false };
    if (pararms.brokerId) {
        query.brokerId = pararms.brokerId
    }
    if (pararms.builderId) {
        query.builderId = pararms.builderId
    }
    if (pararms.status) {
        query.status = pararms.status
    }
    if (pararms.paidTo) {
        query.paidTo = pararms.paidTo
    }
    if (pararms.search) {
        query['$or']=[
            {invoiceAmount : { $regex: pararms.search, $options: "i" }},
            {claimId : { $regex: pararms.search, $options: "i" }},
            {transactionId : { $regex: pararms.search, $options: "i" }},
            {paymentDate : { $regex: pararms.search, $options: "i" }},
        ];
    }
    let data = await utils.getData(Invoice, {
        query: query,
        sort: { _id: -1 },
        pageSize: pararms.pageSize,
        pageNo: pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Invoice, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all invoices', data, res);
};

exports.getAllInvoiceForBuilder = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['brokerId', 'builderId', {
        path: 'claimId',
        model: 'claim',
        populate: [
            {
                path: 'propertyId',
                model: 'property',
                match: {}
            }]
    }];
    const query = { isDeleted: false };
    if (pararms.brokerId) {
        query.brokerId = pararms.brokerId
    }
    if (pararms.builderId) {
        query.builderId = pararms.builderId
    }
    if (pararms.status) {
        query.status = pararms.status
    }
    let data = await utils.getData(Invoice, {
        query: query,
        sort: { _id: -1 },
        pageSize: pararms.pageSize,
        pageNo: pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Invoice, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    data = chain(data)
        // Group the elements of Array based on `color` property
        .groupBy("claimId._id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({ 'claimId': key, invoices: value }))
        .value()
    return sendSuccessMessage('successful in getting all invoices', data, res);
};

exports.getInvoiceById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['brokerId', 'builderId', {
        path: 'claimId',
        model: 'claim',
        populate: [
            {
                path: 'propertyId',
                model: 'property',
                match: {}
            }]
    }];
    const data = await utils.getData(Invoice, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a invoice by id', data, res);
};