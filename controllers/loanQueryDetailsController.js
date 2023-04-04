const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { LoanQueryDetails, Claim, LoanQueryHistory } = require('../models');

exports.addLoanQueryDetails = async (payloadData, res) => {
    const pararms = payloadData.body;
    const checkName = await utils.getData(LoanQueryDetails, {
        query: { name: pararms.name, isDeleted: false },
        fields: ['_id']
    });
    if (size(checkName)) {
        return sendErorMessage('LoanQueryDetails already exists!', {}, res);
    }
    const data = await utils.saveData(LoanQueryDetails, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};

exports.updateLoanQueryDetails = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(LoanQueryDetails, { _id: pararms.id }, pararms);
    return sendSuccessMessage('LoanQueryDetails details successfully updated', data, res);
};
exports.deleteLoanQueryDetails = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(LoanQueryDetails, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllLoanQueryDetails = async (payloadData, res) => {
    let pararms = payloadData.query;
    let query = { isDeleted: false };
    if (pararms.queryStatus) {
        query.queryStatus = pararms.queryStatus;
    }
    const data = await utils.getData(LoanQueryDetails, {
        query: query,
    });
    return sendSuccessMessage('success', data, res);
};

exports.getLoanQueryDetailsById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(LoanQueryDetails, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};

exports.updateDisbursementDetails = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(LoanQueryDetails, { _id: pararms.id }, { disbursementDetails: pararms });
    let claimData = {
        claimType: "dsa",
        milestoneNumber: 1,
        date: moment().date(),
        propertyId: data.propertyId,
        boughtPropertyId: data.boughtPropertyId,
        builderId: data.builderId,
        brokerId: data.brokerId,
        dsaId:data.dsaId
    }
    await utils.upsertData(Claim, claimData, claimData)
    return sendSuccessMessage('DisbursementDetails details successfully updated', data, res);
};



exports.updateLoanQueryStatus = async (payloadData, res) => {
    const pararms = payloadData.body;
    if (pararms.status == "accepted") {
        await utils.updateData(LoanQueryDetails, { _id: pararms.loanQueryId }, {
            queryStatus: "assigned"
        });
        await utils.saveData(LoanQueryHistory, pararms);
    }
    else {
        await utils.updateData(LoanQueryDetails, { _id: pararms.loanQueryId }, {
            dsaId: null,
            queryStatus: "pending"
        });
        await utils.saveData(LoanQueryHistory, pararms);
    }
};

exports.getAllLoanQueryStatusByAdmin = async (payloadData, res) => {
  //  let pararms = payloadData.query;
    let query = { isDeleted: false,dsaId:null };
    const data = await utils.getData(LoanQueryHistory, {
        query: query,
    });
    return sendSuccessMessage('success', data, res);
};


exports.updateDsaInLoanQueryByAdmin = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(LoanQueryDetails, { _id: pararms.loanQueryId }, pararms);
    return sendSuccessMessage('dsa details successfully updated', data, res);  
};




