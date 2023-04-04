const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Ratings  } = require('../models');

exports.addRatings = async (payloadData, res) => {
    const pararms = payloadData.body;
   
    const checkRatings = await utils.getData(Ratings, {
        query: { customerId:pararms.customerId, propertyId:pararms.propertyId , isDeleted: false },
        fields: ['_id']
    });
    if (size(checkRatings)) {
        return sendErorMessage('This customer has already rated this property', {}, res);
    }
    const data = await utils.saveData(Ratings, pararms);
    return sendSuccessMessage('Successfully added new rating', data, res);
};

exports.updateRatings = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Ratings, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Ratings details successfully updated', data, res);
};
exports.deleteRatings= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Ratings, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('customer details deleted successfully!', {}, res);
};

exports.getAllRatingsOfProperty = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['propertyId'];
    let query = { isDeleted: false };
    if(pararms.brokerId){
        query.brokerId = pararms.brokerId
    }
    if(pararms.propertyId){
        query.propertyId = pararms.propertyId
    }
    const data = await utils.getData(Ratings, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    return sendSuccessMessage('successful in getting all ratings', data, res);
};

exports.getAllRatingsByCustomer = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    if(pararms.customerId){
        query.customerId = pararms.customerId
    }
    let data = await utils.getData(Ratings, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(Ratings, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all ratings by a customer', data, res);
};

exports.getRatingsById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['brokerId'];
    const data = await utils.getData(Ratings, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a rating by id', data, res);
};