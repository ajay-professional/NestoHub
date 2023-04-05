const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const mongoose = require('mongoose');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');


const { BrokerEarnings, BoughtProperty,Claim, Visit} = require('../models');

exports.addBrokerEarnings = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(BrokerEarnings, pararms);
    return sendSuccessMessage('Successfully added new category', data, res);
};
exports.updateBrokerEarnings = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(BrokerEarnings, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};

exports.deleteBrokerEarnings = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(BrokerEarnings, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};

exports.getAllBrokerEarnings = async (payloadData, res) => {
    let nestoEarnings = 0;
    let outsideEarnings = 0;
    let result ={
        totalEarnings:{},
        upcomingEarnings:{},
        visitDetails:{}
    };
    let pararms = payloadData.query;
    let query = { brokerId:pararms.brokerId, isDeleted: false };
    let data = await utils.getData(BoughtProperty, {
        query:query,
        sort:{_id:-1},
        populates:['propertyId']
    });
    for(let i=0;i<data.length;i++){
        if(data[i].propertyId.brokerageType=='amount'){
            nestoEarnings  = nestoEarnings + parseInt(data[i].propertyId.brokerageValue);
        }else{
            nestoEarnings  = nestoEarnings +parseInt(data[i].propertyId.brokerageValue)*parseInt(data[i].sellingPrice)/100;
        }
        outsideEarnings = outsideEarnings +  2*parseInt(data[i].sellingPrice)/100;
    }
    result.additionalEarnings=nestoEarnings-outsideEarnings;
    let visitEarnings = await utils.aggregateData(Claim, [
        { $match: { claimType: "visit", brokerId:mongoose.Types.ObjectId(pararms.brokerId), claimStatus:"paid" } },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      let propertyEarnings = await utils.aggregateData(Claim, [
        { $match: { claimType: "property", brokerId:mongoose.Types.ObjectId(pararms.brokerId), claimStatus:"paid" } },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      let loanEarnings = await utils.aggregateData(Claim, [
        { $match: { claimType: "dsa", brokerId:mongoose.Types.ObjectId(pararms.brokerId), claimStatus:"paid" } },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      result.totalEarnings.visitEarnings = visitEarnings && visitEarnings[0] && visitEarnings[0].total ? visitEarnings[0].total : 0 ;
      result.totalEarnings.propertyEarnings = propertyEarnings && propertyEarnings[0] && propertyEarnings[0].total ? propertyEarnings[0].total : 0 ;
      result.totalEarnings.loanEarnings = loanEarnings && loanEarnings[0] && loanEarnings[0].total ? loanEarnings[0].total : 0 ;
      result.totalEarnings.totalEarnings =  result.totalEarnings.visitEarnings + result.totalEarnings.propertyEarnings +  result.totalEarnings.loanEarnings;
      let claimRaised = await utils.aggregateData(Claim, [
        { $match: { claimStatus: "submitted", brokerId:mongoose.Types.ObjectId(pararms.brokerId)} },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      let claimApproved = await utils.aggregateData(Claim, [
        { $match: { claimStatus: "approved", brokerId:mongoose.Types.ObjectId(pararms.brokerId)} },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      let paymentReceived = await utils.aggregateData(Claim, [
        { $match: { claimStatus: "received", brokerId:mongoose.Types.ObjectId(pararms.brokerId)} },
        {
          $group: {
            _id: null,
            total: {
              $sum: { $toInt: "$brokerageAmount" }
            }
          }
        }
      ]);
      result.upcomingEarnings.claimRaised = claimRaised && claimRaised[0] && claimRaised[0].total ? claimRaised[0].total : 0 ;
      result.upcomingEarnings.claimApproved = claimApproved && claimApproved[0] && claimApproved[0].total ? claimApproved[0].total : 0 ;
      result.upcomingEarnings.paymentReceived = paymentReceived && paymentReceived[0] && paymentReceived[0].total ? paymentReceived[0].total : 0 ;
      result.upcomingEarnings.upcomingEarnings =  result.upcomingEarnings.claimRaised +  result.upcomingEarnings.claimApproved +  result.upcomingEarnings.paymentReceived;
      let completeVisit = await utils.countDocuments(Visit, { visitStatus: "completed", brokerId:pararms.brokerId});
      let pendingVisit = await utils.countDocuments(Visit, { visitStatus: "pending", brokerId:pararms.brokerId});
      let followUpVisit = await utils.countDocuments(Visit, { visitStatus: "followup", brokerId:pararms.brokerId});
      let negotiationVisit = await utils.countDocuments(Visit, { visitStatus: "negotiation", brokerId:pararms.brokerId});
      let boughtVisit = await utils.countDocuments(Visit, { visitStatus: "bought", brokerId:pararms.brokerId});
      let visitDetails = completeVisit + pendingVisit + followUpVisit + negotiationVisit + boughtVisit;
      result.visitDetails.completeVisit = completeVisit;
      result.visitDetails.pendingVisit = pendingVisit;
      result.visitDetails.followUpVisit = followUpVisit;
      result.visitDetails.negotiationVisit = negotiationVisit;
      result.visitDetails.boughtVisit = boughtVisit;
      result.visitDetails.visitDetails = visitDetails;
    return sendSuccessMessage('success', result, res);
};

exports.getBrokerEarningsById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(BrokerEarnings, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};