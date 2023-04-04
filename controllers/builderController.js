const { toLower, size, compact } = require('lodash');
const Jwt = require('jsonwebtoken');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const privateKey = env.JWTOKEN;
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Builder, RequestNewProperty , Property, BoughtProperty, Visit, Invoice} = require('../models');
let S3 = require('../helpers/s3/index')({
    aws_s3: {
        "accessKey": env.S3_ACCESSKEYID,
        "accessKeyId": env.S3_ACCESSKEYID,
        "secretAccessKey": env.S3_SECRETACCESSKEY,
        "region": "ap-south-1",
        "bucket": "nestohub"
    }
});
exports.sendOtp = async (payloadData, res) => {
    let pararms = payloadData.body;
    // let randomOTP = Math.floor(100000 + Math.random() * 900000);
    let otp = "123456";
    await utils.upsertData(Builder, { phoneNumber: pararms.phoneNumber }, { phoneNumber: pararms.phoneNumber, otp: otp });
    return sendSuccessMessage('Otp sent successfully', {}, res);
};

exports.verifyOtp = async (payloadData, res) => {
    const pararms = payloadData.body;
    let phoneNumber = pararms.phoneNumber;
    let otp = pararms.otp;

    const checkOTP = await utils.getData(Builder, {
        query: { phoneNumber: phoneNumber, otp: otp, isDeleted: false }
    });

    if (checkOTP && checkOTP.length > 0) { //otp verified
        if (!checkOTP[0].name) { //new user
            const data = {
                status: "newuser"
            };
            return sendSuccessMessage('Otp Successfully Verified! Now share your intern!', data, res);
        }
        else { // old user
            const tokenData = {
                _id: checkOTP[0]._id
            };
            const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
            const data = {
                ...JSON.parse(JSON.stringify(checkOTP[0])),
                token,
                _id: `${checkOTP[0]._id}`,
                status: "olduser"
            };
            return sendSuccessMessage('Otp Successfully Verified', data, res);
        }
    }
    else {
        return sendErorMessage('Your Otp is incorrect', {}, res);
    }
};

exports.addShareYourIntern = async (payloadData, res) => {
    const pararms = payloadData.body;
    let data = await utils.upsertData(Builder, { phoneNumber: pararms.phoneNumber }, pararms);

    pararms.builderId = data._id
    await utils.saveData(RequestNewProperty, pararms);
    const tokenData = {
        _id: data._id,
    };
    const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
    const dataToken = {
        token,
       ...JSON.parse(JSON.stringify(data))
    };

   
    return sendSuccessMessage('Successful! Your requirement is submitted! NestoHub team will contact you soon.', dataToken, res);
};

exports.resendOtp = async (payloadData, res) => {
    const pararms = payloadData.body;
    let phoneNumber = pararms.phoneNumber;
    /*Code for generating random otp and sending to phone/email*/
    let otp = 123456;
    await utils.updateData(Builder, { phoneNumber: pararms.phoneNumber }, { otp: otp }, {});
    const data = {
        phoneNumber,
    };
    return sendSuccessMessage('OTP Sent Successfully', data, res);
};

exports.updatePersonalInfo = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    if (payloadData && payloadData.files && payloadData.files.documents) {
        let images = Array.isArray(payloadData.files.documents) ? payloadData.files.documents : compact([payloadData.files.documents]);
        let PromiseArr = [];
        for (let i = 0; i < images.length; i++) {
            key = S3.genKeyFromFilename(`personalDocuments`, images[i].name || 'jpg', []);
            PromiseArr.push(S3.uploadFile(key, images[i].data, { publicRead: true, mimeType: images[i].mimetype }, 1));
        }
        pararms.documents = await Promise.all(PromiseArr);
    }

    if (payloadData && payloadData.files && payloadData.files.profilePicture) {
        let profilePicture = payloadData.files.profilePicture;
        let key = S3.genKeyFromFilename(`profilePicture`, profilePicture.name || 'jpg', []);
        let imageUrl;
        imageUrl = await S3.uploadFile(key, profilePicture.data, { publicRead: true, mimeType: profilePicture.mimetype }, 1);
        pararms["profilePictureUrl"] = imageUrl;
    }
    const data = await utils.updateData(Builder, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Personal details successfully updated & file successfully uploaded', data, res);
};


////////////////CRUD Builder///////////////

exports.addBuilder = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const checkPhone = await utils.getData(Builder, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });
    if (size(checkPhone)) {
        return sendErorMessage('this phone number is already exist.', {}, res);
    }
    if (payloadData && payloadData.files && payloadData.files.documents) {
        let images = Array.isArray(payloadData.files.documents) ? payloadData.files.documents : compact([payloadData.files.documents]);
        let PromiseArr = [];
        for (let i = 0; i < images.length; i++) {
            key = S3.genKeyFromFilename(`personalDocuments`, images[i].name || 'jpg', []);
            PromiseArr.push(S3.uploadFile(key, images[i].data, { publicRead: true, mimeType: images[i].mimetype }, 1));
        }
        pararms.documents = await Promise.all(PromiseArr);
    }

    if (payloadData && payloadData.files && payloadData.files.profilePicture) {
        let profilePicture = payloadData.files.profilePicture;
        let key = S3.genKeyFromFilename(`profilePicture`, profilePicture.name || 'jpg', []);
        let imageUrl;
        imageUrl = await S3.uploadFile(key, profilePicture.data, { publicRead: true, mimeType: profilePicture.mimetype }, 1);
        pararms["profilePictureUrl"] = imageUrl;
    }
    if (payloadData && payloadData.files && payloadData.files.logo) {
        let logo = payloadData.files.logo;
        let key = S3.genKeyFromFilename(`logo`, logo.name || 'jpg', []);
        let imageUrl;
        imageUrl = await S3.uploadFile(key, logo.data, { publicRead: true, mimeType: logo.mimetype }, 1);
        pararms["logoUrl"] = imageUrl;
    }
    const data = await utils.saveData(Builder, pararms);
    return sendSuccessMessage('Successfully added new builder', data, res);
};

exports.updateBuilder = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    const data = await utils.updateData(Builder, { _id: pararms.id }, pararms);
    return sendSuccessMessage('Builder details successfully updated', data, res);
};
exports.deleteBuilder = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Builder, { _id: pararms.id }, { isDeleted: true }, {});
    return sendSuccessMessage('Builder details deleted successfully!', {}, res);
};
exports.getAllBuilder = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = [{
        'path': 'parentId',
        'match': { 'parentId': {'$ne': null} }
      },{
        'path': 'selectProperties',
        'match': { 'selectProperties': {'$ne': null} }
      }];
    let query = { isDeleted: false };
    if (pararms.parentId) {
        query.parentId =pararms.parentId
    }
    if (pararms.subBuilderType) {
        query.subBuilderType =pararms.subBuilderType
    }
    let data = await utils.getData(Builder, {
        query: query,
        sort:{_id:-1},
        pageSize:pararms.pageSize,
        pageNo:pararms.pageNo,
        populates
    });
    const count = await utils.countDocuments(Builder, query);
    data = JSON.parse(JSON.stringify(data));
    data.forEach(v => { v.totalCount = count });
    return sendSuccessMessage('successful in getting all builder', data, res);
};

exports.getBuilderById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = [{
        'path': 'parentId',
        'match': { 'parentId': {'$ne': null} }
      },{
        'path': 'selectProperties',
        'match': { 'selectProperties': {'$ne': null} }
      }];
    const data = await utils.getData(Builder, {
        query: { _id: pararms.id, isDeleted: false },
        populates
    });
    return sendSuccessMessage('successful in getting a builder by id', data, res);
};

exports.getPropertyAnalytics = async (payloadData, res) => {
    const pararms = payloadData.query;
    let data = {};
    const listedProperties = await utils.countDocuments(Property,{ builderId: pararms.id, isDeleted: false } );
    const soldOutUnits = await utils.countDocuments(BoughtProperty,{ builderId: pararms.id, isDeleted: false } );
    const totalVisit = await utils.countDocuments(Visit,{ builderId: pararms.id, isDeleted: false } );
    data.listedProperties = listedProperties;
    data.soldOutUnits = soldOutUnits;
    data.totalVisit = totalVisit;
    data.averageTimeToSell = 10;
    return sendSuccessMessage('successful in getting a builder by id', data, res);
};

exports.getPendingInvoice = async (payloadData, res) => {
    const pararms = payloadData.query;
    let data = {};
    const pendingInvoice = await utils.countDocuments(Invoice,{ builderId: pararms.id, status: "pending", isDeleted: false } );
    const pendingAmount = await utils.getData(Invoice,{ builderId: pararms.id, status: "pending", isDeleted: false } );
    let totalAmount =0
    for(var i of pendingAmount){
        totalAmount += parseInt(i.invoiceAmount)
    }
    data.pendingInvoice = pendingInvoice;
    data.totalAmount = totalAmount;
    data.averagepayoutTime = 10;
    data.pendingDays = 10;
    return sendSuccessMessage('successful in getting a builder by id', data, res);
};



