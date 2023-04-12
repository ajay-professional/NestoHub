const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { SubscriptionOrder ,Subscription } = require('../models');

exports.addSubscriptionOrder = async (payloadData, res) => {
    const pararms = payloadData.body;
    let planDetails = await utils.getSingleData(Subscription, {
        query:{_id:pararms.planId,isDeleted:false}
    });
    if(!planDetails){
        return sendErorMessage("no Plan Found",{},res);
    }

    pararms.noOfVisits = planDetails.numberOfVisit;
    let result = new Date();
    pararms.expireOn =   result.setDate(result.getDate() + planDetails.planValidityInDays);
    let existingplanDetails = await utils.getSingleData(SubscriptionOrder, {
        query:{builderId:pararms.builderId,expireOn:{$gte:new Date()},isDeleted:false}
    });

    if(existingplanDetails){
        pararms.noOfVisits = pararms.noOfVisits + existingplanDetails.noOfVisits;
        let result = existingplanDetails.expireOn;
        pararms.expireOn =   result.setDate(result.getDate() + planDetails.planValidityInDays);
    }
   
    const data = await utils.upsertData(SubscriptionOrder,{builderId:pararms.builderId}, pararms);
    return sendSuccessMessage('Successfully', data, res);
};


exports.deleteSubscriptionOrder= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(SubscriptionOrder, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('deleted successfully!', {}, res);
};
exports.getAllSubscriptionOrder = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let populates = ['planId','selectProperties','builderId'];
    let data = await utils.getData(SubscriptionOrder, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates
    });
    return sendSuccessMessage('successful in getting all payments', data, res);
};

exports.getSubscriptionOrderById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(SubscriptionOrder, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting a subscribed by id', data, res);
};