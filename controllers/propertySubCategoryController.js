const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { PropertySubCategory  } = require('../models');

// property type for 2BHK , 3 BHK, 4 BHK { CRUD API }
exports.addPropertySubCategory = async (payloadData, res) => {
    const pararms = payloadData.body;
   
    // const checkName = await utils.getData(propertySubCategory, {
    //     query: { name:pararms.name, isDeleted: false },
    //     fields: ['_id']
    // });
    // if (size(checkName)) {
    //     return sendErorMessage('propertySubCategory already exists!', {}, res);
    // }
    const data = await utils.saveData(PropertySubCategory, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};

exports.updatePropertySubCategory = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(PropertySubCategory, { _id: pararms.id }, pararms);
    return sendSuccessMessage('successfully updated', data, res);
};
exports.deletePropertySubCategory= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(PropertySubCategory, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('success', {}, res);
};
exports.getAllPropertySubCategory = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(PropertySubCategory, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(PropertySubCategory, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success', data, res);
};

exports.getPropertySubCategoryById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(PropertySubCategory, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};