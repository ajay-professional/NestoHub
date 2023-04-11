const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Requirement, Visit } = require('../models');

exports.addRequirement = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(Requirement, pararms);
    return sendSuccessMessage('Successfully added new requirement', data, res);
};

exports.updateRequirement = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Requirement, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Requirement details successfully updated', data, res);
};
exports.deleteRequirement= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Requirement, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('requirement details deleted successfully!', {}, res);
};
exports.getAllRequirement = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['customerId', 'brokerId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    if(pararms.customerId){
        query.customerId = pararms.customerId
    }
    if (pararms.search) {
        query.preferredLocation = { $regex: pararms.search, $options: "i" };
    }
    let data = await utils.getData(Requirement, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    data = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
        data[i].latestVisit = await utils.getSingleData(Visit, { clientId: data[0].customerId });
    }
    const count = await utils.countDocuments(Requirement, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all requirement', data, res);
};

exports.getRequirementById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['customerId', 'brokerId'];
    const data = await utils.getData(Requirement, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a requirement by id', data, res);
};