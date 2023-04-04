const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { PromotionBanner } = require('../models');
let S3 = require("../helpers/s3/index")({
    aws_s3: {
        accessKey: env.S3_ACCESSKEYID,
        accessKeyId: env.S3_ACCESSKEYID,
        secretAccessKey: env.S3_SECRETACCESSKEY,
        region: "ap-south-1",
        bucket: "nestohub",
    },
});

exports.addPromotionBanner = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(PromotionBanner, pararms);
    return sendSuccessMessage('Successfully added new PromotionBanner', data, res);
};

exports.updatePromotionBanner = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(PromotionBanner, { _id: pararms.id }, pararms);
    return sendSuccessMessage(' PromotionBanner details successfully updated', data, res);
};

exports.deletePromotionBanner = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(PromotionBanner, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage(' PromotionBanner details deleted successfully!', {}, res);
};

exports.getAllPromotionBanner = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    const populates = ["propertyId"];
    let data = await utils.getData(PromotionBanner, {
        query: query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count  = await utils.countDocuments(PromotionBanner,query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => {v.totalCount = count});
    return sendSuccessMessage('successful in getting all PromotionBanner', data, res);
};

exports.getPromotionBannerById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ["propertyId"];
    const data = await utils.getData(PromotionBanner, {
        query: { _id: pararms.id, isDeleted: false },
        populates
    });
    return sendSuccessMessage('successful in getting a PromotionBanner by id', data, res);
};

