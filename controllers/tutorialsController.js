const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Tutorials } = require('../models');
let S3 = require("../helpers/s3/index")({
    aws_s3: {
      accessKey: env.S3_ACCESSKEYID,
      accessKeyId: env.S3_ACCESSKEYID,
      secretAccessKey: env.S3_SECRETACCESSKEY,
      region: "ap-south-1",
      bucket: "nestohub",
    },
});

exports.addTutorials = async (payloadData, res) => {
    const pararms = payloadData.body;

   

    if (payloadData && payloadData.files && payloadData.files.thumbnail) {
        let thumbnail = payloadData.files.thumbnail;
        let key = S3.genKeyFromFilename(
            `thumbnail`,
            thumbnail.name || "jpg",
            []
        );
        let thumbnailUrl;
        thumbnailUrl = await S3.uploadFile(
            key,
            thumbnail.data,
            { publicRead: true, mimeType: thumbnail.mimetype },
            1
        );
        pararms.thumbnail = thumbnailUrl;
    }
    const data = await utils.saveData(Tutorials, pararms);
    return sendSuccessMessage('Successfully added new  Tutorials', data, res);
};

exports.updateTutorials = async (payloadData, res) => {
    const pararms = payloadData.body;
    if (payloadData && payloadData.files && payloadData.files.thumbnail) {
        let thumbnail = payloadData.files.thumbnail;
        let key = S3.genKeyFromFilename(
            `thumbnail`,
            thumbnail.name || "jpg",
            []
        );
        let thumbnailUrl;
        thumbnailUrl = await S3.uploadFile(
            key,
            thumbnail.data,
            { publicRead: true, mimeType: thumbnail.mimetype },
            1
        );
        pararms.thumbnail = thumbnailUrl;
    }
    const data = await utils.updateData(Tutorials, { _id: pararms.id }, pararms);
    return sendSuccessMessage(' Tutorials details successfully updated', data, res);
};

exports.deleteTutorials = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Tutorials, { _id: pararms.id }, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ]);
    return sendSuccessMessage(' Tutorials details deleted successfully!', {}, res);
};

exports.getAllTutorials = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    if (pararms.search) {
        query.title = { $regex: pararms.search, $options: "i" };
    }
    let data = await utils.getData(Tutorials, {
        query: query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
    });
    const count = await utils.countDocuments(Tutorials, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all tutorials', data, res);
};

exports.getTutorialsById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Tutorials, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting a  Tutorials by id', data, res);
};