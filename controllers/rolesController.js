const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Roles } = require('../models');

exports.addRoles = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    await utils.saveData(Roles, pararms);
    return sendSuccessMessage('Successfully added role!', {}, res);
};

exports.updateRoles = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
     await utils.updateData(Roles, { _id: pararms.id}, pararms);
    return sendSuccessMessage('role successfully updated', {}, res);
};

exports.deleteRoles = async (payloadData, res) => {
    const pararms = payloadData.query;
   await utils.updateData(Roles, { _id: pararms.id }, { isDeleted: true }, {});
    return sendSuccessMessage('role deleted successfully!', {}, res);
};

exports.getAllRoles = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId','selectProperties'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    if(pararms.add){
        query.add = pararms.add
    }
    let data = await utils.getData(Roles, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Roles, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success!', data, res);
};

exports.getRolesById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['builderId','selectProperties'];
    const data = await utils.getData(Roles, {
        query: { _id: pararms.id,isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success ', data, res);
};

