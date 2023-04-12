const { toLower, size,compact } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { RequestProperty  } = require('../models');
let S3 = require('../helpers/s3/index')({
    aws_s3: {
        "accessKey": env.S3_ACCESSKEYID,
        "accessKeyId": env.S3_ACCESSKEYID,
        "secretAccessKey": env.S3_SECRETACCESSKEY,
        "region": "ap-south-1",
        "bucket": "nestohub"
    }
});
exports.addRequestProperty = async (payloadData, res) => {
    const pararms = payloadData.body;
   
    if(pararms.images){
        pararms.images = JSON.parse(pararms.images);
    }
    if(pararms.amenities){
        pararms.amenities = JSON.parse(pararms.amenities);
    }
    if(pararms.loanApprovedBy){
        pararms.loanApprovedBy = JSON.parse(pararms.loanApprovedBy);
    }
    if(pararms.locationAdvantages){
        pararms.locationAdvantages = JSON.parse(pararms.locationAdvantages);
    }
    if(pararms.paymentPlan){
        pararms.paymentPlan = JSON.parse(pararms.paymentPlan);
    }
    // const checkProperty = await utils.getData(RequestProperty, {
    //     query: { name: pararms.name, location:pararms.location, categoryId:pararms.categoryId, builderId:pararms.builderId ,isDeleted: false },
    //     fields: ['_id']
    // });
    // if (size(checkProperty)) {
    //     return sendErorMessage('RequestProperty for this builder Already Exist.', {}, res);
    // }
    if (payloadData && payloadData.files && payloadData.files.images) {
        let images = Array.isArray(payloadData.files.images) ? payloadData.files.images : compact([payloadData.files.images]);
        let PromiseArr = [];
        for (let i = 0; i < images.length; i++) {
            key = S3.genKeyFromFilename(`requestPropertyImages`, images[i].name || 'jpg', []);
            PromiseArr.push(S3.uploadFile(key, images[i].data, { publicRead: true, mimeType: images[i].mimetype }, 1));
        }
        pararms.images = await Promise.all(PromiseArr);
    }

    if (payloadData && payloadData.files && payloadData.files.brochure) {
        let brochure = payloadData.files.brochure;
        let key = S3.genKeyFromFilename(`brochure`, brochure.name || 'jpg', []);
        let brochureUrl;
        brochureUrl = await S3.uploadFile(key, brochure.data, { publicRead: true, mimeType: brochure.mimetype }, 1);
        pararms["brochureUrl"] = brochureUrl;
    }
    const data=   await utils.saveData(RequestProperty, pararms);
    return sendSuccessMessage('Successfully added new requestProperty', data, res);
};

exports.updateRequestProperty = async (payloadData, res) => {
    const pararms = payloadData.body;
    if(pararms.amenities){
        pararms.amenities = JSON.parse(pararms.amenities);
    }
    if(pararms.loanApprovedBy){
        pararms.loanApprovedBy = JSON.parse(pararms.loanApprovedBy);
    }
    if(pararms.locationAdvantages){
        pararms.locationAdvantages = JSON.parse(pararms.locationAdvantages);
    }
    if(pararms.paymentPlan){
        pararms.paymentPlan = JSON.parse(pararms.paymentPlan);
    }
    const data = await utils.updateData(RequestProperty, { _id: pararms.id }, pararms);
    return sendSuccessMessage('RequestProperty details successfully updated', data, res);
};
exports.deleteRequestProperty= async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(RequestProperty, { _id: pararms.id}, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ], {});
    return sendSuccessMessage('requestProperty details deleted successfully!', {}, res);
};
exports.getAllRequestProperty = async (payloadData, res) => {
    let pararms = payloadData.query;
    const populates = ['builderId'];
    let query = { isDeleted: false };
    if(pararms.builderId){
        query.builderId = pararms.builderId
    }
    let data = await utils.getData(RequestProperty, {
        query:query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates,
    });
    const count = await utils.countDocuments(RequestProperty, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all requestPropertys', data, res);
};

exports.getRequestPropertyById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['builderId'];
    const data = await utils.getData(RequestProperty, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('successful in getting a requestProperty by id', data, res);
};