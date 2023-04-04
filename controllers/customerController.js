const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Customer, Visit } = require('../models');

exports.addCustomer = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const checkPhone = await utils.getData(Customer, {
        query: { phoneNumber: pararms.phoneNumber, brokerId: pararms.brokerId, isDeleted: false },
        fields: ['_id']
    });
    if (size(checkPhone)) {
        return sendErorMessage('The customer with this phone is already registered with us for this broker.', {}, res);
    }
    const data = await utils.saveData(Customer, pararms);
    return sendSuccessMessage('Successfully added new customer', data, res);
};

exports.updateCustomer = async (payloadData, res) => {
    try {
        const pararms = payloadData.body;
        pararms.email = toLower(pararms.email);
        const data = await utils.updateData(Customer, { _id: pararms.id }, pararms);
        return sendSuccessMessage('Customer details successfully updated', data, res);

    } catch (err) {
        console.log(err);
    }
};
exports.deleteCustomer = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Customer, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('customer details deleted successfully!', {}, res);
};
exports.getAllCustomer = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['brokerId'];
    let query = { isDeleted: false };
    if (pararms.brokerId) {
        query.brokerId = pararms.brokerId
    }
    if (pararms.search) {
        query.clientName = { $regex: pararms.search, $options: 'i' }
    }
    let data = await utils.getData(Customer, {
        query: query,
        sort: { _id: -1 },
        pageSize: pararms.pageSize,
        pageNo: pararms.pageNo,
        populates,
    });
    data = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
        data[i].latestVisit = await utils.getSingleData(Visit, { clientId: data[0]._id })
    }
    const count = await utils.countDocuments(Customer, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all customers', data, res);
};

exports.getCustomerById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(Customer, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a customer by id', data, res);
};

