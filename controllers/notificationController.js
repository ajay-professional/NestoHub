const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Notification} = require('../models');


exports.getAllNotification = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = [{
        'path': 'builderId',
        'match': { 'builderId': {'$ne': null} }
      },{
        'path': 'brokerId',
        'match': { 'brokerId': {'$ne': null} }
      }];
    let query = { isDeleted: false };
    if (pararms.sendTo) {
        query.sendTo = pararms.sendTo
    }
    if (pararms.brokerId) {
        query.brokerId = pararms.brokerId
    }
    if (pararms.builderId) {
        query.builderId = pararms.builderId
    }
    let data = await utils.getData(Notification, {
        query: query,
        sort: { _id: -1 },
        pageSize: pararms.pageSize,
        pageNo: pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(Notification, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful', data, res);
};

