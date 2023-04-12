const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Banner } = require('../models');
let S3 = require("../helpers/s3/index")({
    aws_s3: {
        accessKey: env.S3_ACCESSKEYID,
        accessKeyId: env.S3_ACCESSKEYID,
        secretAccessKey: env.S3_SECRETACCESSKEY,
        region: "ap-south-1",
        bucket: "nestohub",
    },
});

exports.addBanner = async (payloadData, res) => {
    const pararms = payloadData.body;
    
    if (payloadData && payloadData.files && payloadData.files.image) {
        let image = payloadData.files.image;
        let key = S3.genKeyFromFilename(
            `image`,
            image.name || "jpg",
            []
        );
        let imageUrl;
        imageUrl = await S3.uploadFile(
            key,
            image.data,
            { publicRead: true, mimeType: image.mimetype },
            1
        );
        pararms.image = imageUrl;
    }
    const data = await utils.saveData(Banner, pararms);
    return sendSuccessMessage('Successfully added new  Banner', data, res);
};

exports.updateBanner = async (payloadData, res) => {
    const pararms = payloadData.body;
    if (payloadData && payloadData.files && payloadData.files.image) {
        let image = payloadData.files.image;
        let key = S3.genKeyFromFilename(
            `image`,
            image.name || "jpg",
            []
        );
        let imageUrl;
        imageUrl = await S3.uploadFile(
            key,
            image.data,
            { publicRead: true, mimeType: image.mimetype },
            1
        );
        pararms.image = imageUrl;
    }
    const data = await utils.updateData(Banner, { _id: pararms.id }, pararms);
    return sendSuccessMessage(' Banner details successfully updated', data, res);
};

exports.deleteBanner = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Banner, { _id: pararms.id }, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage(' Banner details deleted successfully!', {}, res);
};

exports.getAllBanner = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    const populates = ["propertyId"];
    let data = await utils.getData(Banner, {
        query: query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates
    });
    const count  = await utils.countDocuments(Banner,query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => {v.totalCount = count});
    return sendSuccessMessage('successful in getting all banner', data, res);
};

exports.getBannerById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ["propertyId"];
    const data = await utils.getData(Banner, {
        query: { _id: pararms.id, isDeleted: false },
        populates
    });
    return sendSuccessMessage('successful in getting a Banner by id', data, res);
};