const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { PropertyCategory  } = require('../models');
let S3 = require("../helpers/s3/index")({
    aws_s3: {
        accessKey: env.S3_ACCESSKEYID,
        accessKeyId: env.S3_ACCESSKEYID,
        secretAccessKey: env.S3_SECRETACCESSKEY,
        region: "ap-south-1",
        bucket: "nestohub",
    },
});
// property type for 2BHK , 3 BHK, 4 BHK { CRUD API }
exports.addPropertyCategory = async (payloadData, res) => {
    const pararms = payloadData.body;
  
    if (payloadData && payloadData.files && payloadData.files.icon) {
        let icon = payloadData.files.icon;
        let key = S3.genKeyFromFilename(
          `icon`,
          icon.name || "jpg",
          []
        );
        let iconUrl;
        iconUrl = await S3.uploadFile(
          key,
          icon.data,
          { publicRead: true, mimeType: icon.mimetype },
          1
        );
        pararms.iconUrl = iconUrl;
      }
    const checkName = await utils.getData(PropertyCategory, {
        query: { name:pararms.name, isDeleted: false },
        fields: ['_id']
    });
    if (size(checkName)) {
        return sendErorMessage('PropertyCategory already exists!', {}, res);
    }
    const data = await utils.saveData(PropertyCategory, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};

exports.updatePropertyCategory = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    pararms.email = toLower(pararms.email);
    
  if (payloadData && payloadData.files && payloadData.files.icon) {
    let icon = payloadData.files.icon;
    let key = S3.genKeyFromFilename(
      `icon`,
      icon.name || "jpg",
      []
    );
    let iconUrl;
    iconUrl = await S3.uploadFile(
      key,
      icon.data,
      { publicRead: true, mimeType: icon.mimetype },
      1
    );
    pararms.iconUrl = iconUrl;
  }
    const data = await utils.updateData(PropertyCategory, { _id: pararms.id }, pararms);
    return sendSuccessMessage('successfully updated', data, res);
};
exports.deletePropertyCategory= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(PropertyCategory, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('success', {}, res);
};
exports.getAllPropertyCategory = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(PropertyCategory, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(PropertyCategory, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('success', data, res);
};

exports.getPropertyCategoryById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(PropertyCategory, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};