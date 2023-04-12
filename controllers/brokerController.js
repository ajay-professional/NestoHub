const { toLower, size, compact } = require('lodash');
const Jwt = require('jsonwebtoken');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const privateKey = env.JWTOKEN;
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { ReferalEarnings, ReferalCode, Broker, Builder, Visit, Customer, BoughtProperty, Claim } = require('../models');
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

    const checkPhone = await utils.getData(Broker, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (!size(checkPhone)) { //new user
        /*Code for generating random otp and sending to phone/email*/
        let otp = 123456;
        await utils.saveData(Broker, { phoneNumber: pararms.phoneNumber, otp: otp });
        const data = {
            phoneNumber,
        };
        return sendSuccessMessage('OTP Sent Successfully', data, res);
        //return sendErorMessage('Not Registered. You are not register with us!. Please share your intent.', {}, res);
    } else {
        /*Code for generating random otp and sending to phone/email*/
        //already existing user
        let otp = 123456;
        await utils.updateData(Broker, { phoneNumber: pararms.phoneNumber }, { otp: otp });
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

    const checkOTP = await utils.getData(Broker, {
        query: { phoneNumber: phoneNumber, otp: otp, isDeleted: false },
        fields: ['_id', 'referalCode', 'name', 'phoneNumber']
    });

    if (checkOTP && checkOTP.length > 0) { //otp verified
        if (!checkOTP[0].name) { //new user
            const data = {
                status: "newuser",
                phoneNumber: `${checkOTP[0].phoneNumber}`
            };
            return sendSuccessMessage('Otp Successfully Verified! Now register to get started !', data, res);
        }
        else { // old user
            const tokenData = {
                _id: checkOTP[0]._id
            };
            const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
            const data = {
                token,
                ...JSON.parse(JSON.stringify(checkOTP[0])),
                _id: `${checkOTP[0]._id}`,
                status: "olduser",
                referalCode: `${checkOTP[0].referalCode}`,
                phoneNumber: `${checkOTP[0].phoneNumber}`
            };
            return sendSuccessMessage('Otp Successfully Verified', data, res);
        }
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
    await utils.updateData(Broker, { phoneNumber: pararms.phoneNumber }, { otp: otp });
    const data = {
        phoneNumber,
    };
    return sendSuccessMessage('OTP resent Successfully', data, res);
};

exports.registerName = async (payloadData, res) => {
    let outputCode;

    const pararms = payloadData.body;

    const checkPhone = await utils.getData(Broker, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (!size(checkPhone)) {
        return sendErorMessage('This number is not registered . Try with different number.', {}, res);
    }
    const checkBuilder = await utils.getData(Builder, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (size(checkBuilder)) {
        return sendErorMessage('This number is already registered as a builder with us. Try with different number.', {}, res);
    }

    //code for generating random refercode and saving in the database and sending refercode back to frontend
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    outputCode = generateString(4);

    pararms.referalCode = `BR${outputCode}`;

    let user = await utils.updateData(Broker, { phoneNumber: pararms.phoneNumber }, pararms);

    const tokenData = {
        _id: user._id
    };

    const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });

    const data = {
        token,
        name: `${user.name}`,
        _id: `${user._id}`,
        referalCode: `${user.referalCode}`,
        phoneNumber: pararms.phoneNumber,
        status: "new user registered!"
    };

    const referData = await utils.saveData(ReferalCode, { referalCode: pararms.referalCode, brokerId: user._id });



    return sendSuccessMessage('user registered successful', data, res);
};

exports.registerFromReferal = async (payloadData, res) => {
    let outputCode;

    const pararms = payloadData.body;

    const checkBuilder = await utils.getData(Builder, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id']
    });

    if (size(checkBuilder)) {
        return sendErorMessage('This number is already registered as a builder with us. Try with different number.', {}, res);
    }

    const checkReferCode = await utils.getData(ReferalCode, {
        query: { referalCode: pararms.referalCode, isDeleted: false },
        fields: ['_id', 'referalCode', 'brokerId']
    });

    if (size(checkReferCode)) {
        /*Code for generating random otp and sending to phone/email*/
        pararms.otp = 123456;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }



        outputCode = generateString(6);

        pararms.referalCode = "BR" + `${outputCode}`;

        const user = await utils.saveData(Broker, pararms);

        let currDate = new Date();

        const referEarn = await utils.saveData(ReferalEarnings, { BrokerId: user[0]._id, BrokerPhoneNumber: user[0].phoneNumber, referDate: `${currDate}`, brokerId: pararms.brokerId });
        return sendSuccessMessage('registered and otp sent! Now verify otp', {}, res);
    }
    else {
        return sendErorMessage('You have entered wrong referal code !', {}, res);
    }
};

exports.updatePersonalInfo = async (payloadData, res) => {
    const pararms = payloadData.body;
    pararms.email = toLower(pararms.email);

    let documentArr = [];
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
    const data = await utils.updateData(Broker, { _id: pararms.id }, pararms);
    return sendSuccessMessage(
        "Personal details successfully updated & file successfully uploaded",
        data,
        res
    );
};

exports.updateBankInfo = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Broker, { _id: pararms.id }, pararms);
    return sendSuccessMessage("Bank Details Updated Successfully", data, res);
};

exports.updatePreferences = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Broker, { _id: pararms.id }, pararms);
    return sendSuccessMessage("Preferences Updated Successfully", data, res);
};

exports.addBroker = async (payloadData, res) => {
    const pararms = payloadData.body;
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
    const data = await utils.saveData(Broker, pararms);
    return sendSuccessMessage('Successfully added new BROKER', data, res);
};

exports.updateBroker = async (payloadData, res) => {
    const pararms = payloadData.body;
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
    const data = await utils.updateData(Broker, { _id: pararms.id }, pararms);
    return sendSuccessMessage("Broker Details Updated Successfully", data, res);
};

exports.deleteBroker = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Broker, { _id: pararms.id }, [
        { $set: { isDeleted: { $not: "$isDeleted" } } }
      ], {});
    return sendSuccessMessage('Broker details deleted successfully!', {}, res);
};

// exports.getAllBroker = async (payloadData, res) => {
//     let pararms = payloadData.query;
//     let query = { isDeleted: false };
//     let data = await utils.getData(Broker, {
//         query: query,
//         sort: { _id: -1 },
//         pageSize: pararms.pageSize,
//         pageNo: pararms.pageNo,
//     });
//     data = JSON.parse(JSON.stringify(data));
//     const count = await utils.countDocuments(Broker, query);

//     for (let i = 0; i < data.length; i++) {
//         data[i].noOfVisits = await utils.countDocuments(Visit, { brokerId: data[i]._id })
//         data[i].noOfCustomers = await utils.countDocuments(Customer, { brokerId: data[i]._id })
//         data[i].totalCount = count
//     }
//     return sendSuccessMessage('successful in getting all broker', data, res);
// };
exports.getAllBroker = async (payloadData, res) => {
    const params = payloadData.query;
    const query = { isDeleted: false };

    let [data, totalCount] = await Promise.all([
        utils.getData(Broker, {
            query: query,
            sort: { _id: -1 },
            pageSize: params.pageSize,
            pageNo: params.pageNo,
        }),
        utils.countDocuments(Broker, query)
    ]);
    data = JSON.parse(JSON.stringify(data))
    const brokerIds = data.map(d => d._id);
    const [visitCounts, customerCounts, soldPropertiesCounts, claimsCounts] = await Promise.all([
        utils.aggregateData(Visit, [
            { $match: { brokerId: { $in: brokerIds } } },
            { $group: { _id: "$brokerId", count: { $sum: 1 } } }
        ]),
        utils.aggregateData(Customer, [
            { $match: { brokerId: { $in: brokerIds } } },
            { $group: { _id: "$brokerId", count: { $sum: 1 } } }
        ]),
        utils.aggregateData(BoughtProperty, [
            { $match: { brokerId: { $in: brokerIds } } },
            { $group: { _id: "$brokerId", count: { $sum: 1 } } }
        ]),
        utils.aggregateData(Claim, [
            { $match: { brokerId: { $in: brokerIds } } },
            { $group: { _id: "$brokerId", count: { $sum: 1 } } }
        ])
    ]);

    const visitCountsMap = new Map(visitCounts.map(v => [v._id.toString(), v.count]));
    const customerCountsMap = new Map(customerCounts.map(c => [c._id.toString(), c.count]));
    const soldPropertiesCountsMap = new Map(soldPropertiesCounts.map(s => [s._id.toString(), s.count]));
    const claimsCountsMap = new Map(claimsCounts.map(cl => [cl._id.toString(), cl.count]));

    let result = data.map(d => ({
        ...d,
        noOfVisits: visitCountsMap.get(d._id.toString()) || 0,
        noOfCustomers: customerCountsMap.get(d._id.toString()) || 0,
        noOfSoldProperties: soldPropertiesCountsMap.get(d._id.toString()) || 0,
        noOfClaimsCount: claimsCountsMap.get(d._id.toString()) || 0,
        totalCount
    }));

    return sendSuccessMessage('successful in getting all broker', result, res);
};

exports.getBrokerById = async (payloadData, res) => {
    const pararms = payloadData.query;
    let query = { isDeleted: false };
    let data = await utils.getData(Broker, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('successful in getting broker by id', data, res);
};


// exports.getReferalCode = async (payloadData, res) => {
//     const pararms = payloadData.body;
//     let query = { isDeleted: false };
//     if(pararms.brokerId){
//         query.brokerId = pararms.brokerId
//     }
//     const brokerReferal = await utils.getData(Broker, {
//         query: { _id: pararms.brokerId, isDeleted: false },
//         fields: ['_id', 'referalCode']
//     });

//     let data ={
//         referalCode:`${brokerReferal[0].referalCode}`
//     }

//     return sendSuccessMessage('success', data, res);
// };
