const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { LocationAdvantage  } = require('../models');
let S3 = require("../helpers/s3/index")({
  aws_s3: {
    accessKey: env.S3_ACCESSKEYID,
    accessKeyId: env.S3_ACCESSKEYID,
    secretAccessKey: env.S3_SECRETACCESSKEY,
    region: "ap-south-1",
    bucket: "nestohub",
  },
});

exports.addLocationAdvantage = async (payloadData, res) => {
    const pararms = payloadData.body;
    if (payloadData && payloadData.files && payloadData.files.image) {
        let image = payloadData.files.image;
        let key = S3.genKeyFromFilename(`locationAdvantage`, image.name || 'jpg', []);
        pararms["image"] = await S3.uploadFile(key, image.data, { publicRead: true, mimeType: image.mimetype }, 1);
    }
    const data = await utils.saveData(LocationAdvantage, pararms);
    return sendSuccessMessage('Success', data, res);
};

exports.updateLocationAdvantage = async (payloadData, res) => {
    const pararms = payloadData.body;
    if (payloadData && payloadData.files && payloadData.files.image) {
        let image = payloadData.files.image;
        let key = S3.genKeyFromFilename(`locationAdvantage`, image.name || 'jpg', []);
        pararms["image"] = await S3.uploadFile(key, image.data, { publicRead: true, mimeType: image.mimetype }, 1);
    }
    const data = await utils.updateData(LocationAdvantage, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteLocationAdvantage= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(LocationAdvantage, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage('success', {}, res);
};
exports.getAllLocationAdvantage = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(LocationAdvantage, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });

    const count  = await utils.countDocuments(LocationAdvantage,query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => {v.totalCount = count});
    return sendSuccessMessage('success', data, res);
};

exports.getLocationAdvantageById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(LocationAdvantage, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};