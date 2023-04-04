const { toLower, size, compact } = require('lodash');
const Jwt = require('jsonwebtoken');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const privateKey = env.JWTOKEN;
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Dsa } = require('../models');
let S3 = require('../helpers/s3/index')({
    aws_s3: {
        "accessKey": env.S3_ACCESSKEYID,
        "accessKeyId": env.S3_ACCESSKEYID,
        "secretAccessKey": env.S3_SECRETACCESSKEY,
        "region": "ap-south-1",
        "bucket": "nestoHub101"
    }
});
// exports.sendOtp = async (payloadData, res) => {
//     let otp=123456
//     let data = await utils.saveData(Builder, otp)
//     return sendSuccessMessage('success',data, res)
// }

exports.sendOtp = async (payloadData, res) => {
    const pararms = payloadData.body;
    let phoneNumber = pararms.phoneNumber;

    const checkPhone = await utils.getData(Dsa, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (!size(checkPhone)) { //new user
        /*Code for generating random otp and sending to phone/email*/
        return sendSuccessMessage('Number does not exists', {}, res);
        //return sendErorMessage('Not Registered. You are not register with us!. Please share your intent.', {}, res);
    } else {
        /*Code for generating random otp and sending to phone/email*/
        //already existing user
        let otp = 123456;
        await utils.updateData(Dsa, { phoneNumber: pararms.phoneNumber }, { otp: otp });
        const data = {
            phoneNumber,
        };
        return sendSuccessMessage('OTP Sent Successfully', data, res);
    }
};

exports.verifyOtp = async (payloadData, res) => {
    const pararms = payloadData.body;
    let phoneNumber = pararms.phoneNumber;
    let otp = pararms.otp;

    const checkOTP = await utils.getData(Dsa, {
        query: { phoneNumber: phoneNumber, otp: otp, isDeleted: false },
        fields: ['_id', 'name', 'phoneNumber']
    });

    if (checkOTP && checkOTP.length > 0) { //otp verified
            const tokenData = {
                _id: checkOTP[0]._id
            };
            const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
            const data = {
                token,
                name: `${checkOTP[0].name}`,
                _id: `${checkOTP[0]._id}`
            };
            return sendSuccessMessage('Otp Successfully Verified', data, res);
        }
    else {
        return sendErorMessage('Your Otp is incorrect', {}, res);
    }
};

exports.resendOtp = async (payloadData, res) => {
    const pararms = payloadData.body;
    let phoneNumber = pararms.phoneNumber;

    /*Code for generating random otp and sending to phone/email*/

    let otp = 123456;
    await utils.updateData(Dsa, { phoneNumber: pararms.phoneNumber }, { otp: otp });
    const data = {
        phoneNumber,
    };
    return sendSuccessMessage('OTP resent Successfully', data, res);
};

exports.addDsa = async (payloadData, res) => {

    const pararms = payloadData.body;

    const checkDsa = await utils.getData(Dsa, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (size(checkDsa)) {
        return sendErorMessage('This number is already registered as a dsa with us. Try with different number.', {}, res);
    }

    await utils.saveData(Dsa, pararms);

    return sendSuccessMessage('dsa added successful', {}, res);
};

exports.updatePersonalInfo = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);
    if(pararms.areaOfOperations){
        pararms.areaOfOperations = JSON.parse(pararms.areaOfOperations) 
    }
    if(pararms.bankAssociations){
        pararms.bankAssociations = JSON.parse(pararms.bankAssociations) 
    }
    
    if (payloadData && payloadData.files && payloadData.files.documents) {
        let images = Array.isArray(payloadData.files.documents)
            ? payloadData.files.documents
            : compact([payloadData.files.documents]);
        let PromiseArr = [];
        for (let i = 0; i < images.length; i++) {
            key = S3.genKeyFromFilename(
                `personalDocuments`,
                images[i].name || "jpg",
                []
            );
            PromiseArr.push(
                S3.uploadFile(
                    key,
                    images[i].data,
                    { publicRead: true, mimeType: images[i].mimetype },
                    1
                )
            );
        }
        pararms.documents = await Promise.all(PromiseArr);
    }

    if (payloadData && payloadData.files && payloadData.files.profilePicture) {
        let profilePicture = payloadData.files.profilePicture;
        let key = S3.genKeyFromFilename(
            `profilePicture`,
            profilePicture.name || "jpg",
            []
        );
        let profilePictureUrl;
        profilePictureUrl = await S3.uploadFile(
            key,
            profilePicture.data,
            { publicRead: true, mimeType: profilePicture.mimetype },
            1
        );
        pararms.profilePicture = profilePictureUrl;
    }
    const data = await utils.updateData(Dsa, { _id: pararms.id }, pararms);
    return sendSuccessMessage('updatePersonalInfo details successfully updated', data, res);
 
};