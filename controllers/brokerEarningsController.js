const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');

const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');


const { BrokerEarnings, BoughtProperty  } = require('../models');

exports.addBrokerEarnings = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(BrokerEarnings, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};
exports.updateBrokerEarnings = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(BrokerEarnings, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.deleteBrokerEarnings= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(BrokerEarnings, { _id: pararms.id}, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};

exports.getAllBrokerEarnings = async (payloadData, res) => {
    let nestoEarnings = 0;
    let outsideEarnings = 0;
    let result ={};
    let pararms = payloadData.query;
    let query = { brokerId:pararms.brokerId, isDeleted: false };
    let data = await utils.getData(BoughtProperty, {
        query:query,
        sort:{_id:-1},
        populates:['propertyId']
    });
    for(let i=0;i<data.length;i++){
        if(data[i].propertyId.brokerageType=='amount'){
            nestoEarnings  = nestoEarnings + parseInt(data[i].propertyId.brokerageValue);
        }else{
            nestoEarnings  = nestoEarnings +parseInt(data[i].propertyId.brokerageValue)*parseInt(data[i].sellingPrice)/100;
        }
        outsideEarnings = outsideEarnings +  2*parseInt(data[i].sellingPrice)/100;
    }
    result.additionalEarnings=nestoEarnings-outsideEarnings;
    return sendSuccessMessage('success', result , res);
};

exports.getBrokerEarningsById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(BrokerEarnings, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};