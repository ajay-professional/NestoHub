const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
const mongoose = require('mongoose');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');


const { BrokerEarnings, BoughtProperty, Claim, Visit, LoanQueryDetails} = require('../models');

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
        visitDetails:{},
        loanQuery:{},
        claimApprovalRate:{},
        totalReferralEarnings:{}
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

// exports.getAllBrokerEarningsForMobile = async (payloadData, res) => {
//     const result = {
//       earnings: []
//     };
//     const params = payloadData.query;
  
//     // Visit counts
//     const visitCounts = await utils.aggregateData(Visit, [
//       {
//         $match: {
//           brokerId: mongoose.Types.ObjectId(params.brokerId),
//           visitStatus: { $in: ["completed", "pending", "followup", "negotiation", "bought"] }
//         }
//       },
//       {
//         $group: {
//           _id: "$visitStatus",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           status: "$_id",
//           count: 1
//         }
//       }
//     ]);
    
//     const obj3 = {
//       completed: 0,
//       pending: 0,
//       followup: 0,
//       negotiation: 0,
//       bought: 0
//     };
//     for (const count of visitCounts) {
//       obj3[count.status] = count.count;
//     }
    
//     result.earnings.push({
//       title: "visitDetails",
//       completeVisit: obj3.completed,
//       pendingVisit: obj3.pending,
//       followUpVisit: obj3.followup,
//       negotiationVisit: obj3.negotiation,
//       boughtVisit: obj3.bought,
//       total: obj3.completed + obj3.pending + obj3.followup + obj3.negotiation + obj3.bought
//     });
    
//     // Loan query counts
//     const loanQueryCounts = await utils.aggregateData(LoanQueryDetails, [
//       {
//         $match: {
//           brokerId: mongoose.Types.ObjectId(params.brokerId),
//           queryStatus: { $in: ["pending", "assigned", "matured", "notmatured"] }
//         }
//       },
//       {
//         $group: {
//           _id: "$queryStatus",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           status: "$_id",
//           count: 1
//         }
//       }
//     ]);
    
//     const obj4 = {
//       pending: 0,
//       assigned: 0,
//       matured: 0,
//       notmatured: 0
//     };
//     for (const count of loanQueryCounts) {
//       obj4[count.status] = count.count;
//     }
    
//     result.earnings.push({
//       title: "loanQuery",
//       raisedQuery: obj4.pending,
//       assignedQuery: obj4.assigned,
//       maturedQuery: obj4.matured,
//       notmaturedQuery: obj4.notmatured,
//       total: obj4.pending + obj4.assigned + obj4.matured + obj4.notmatured
//     });
  
//     return sendSuccessMessage('success', result, res);
//   };
  
exports.getAllBrokerEarningsForMobile = async (payloadData, res) => {
    let nestoEarnings = 0;
    let outsideEarnings = 0;
    let result ={
        earnings:[]
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
      let obj1 = {};
      obj1.title = "totalEarnings";
      obj1.visitEarnings = visitEarnings && visitEarnings[0] && visitEarnings[0].total ? visitEarnings[0].total : 0 ;
      obj1.propertyEarnings = propertyEarnings && propertyEarnings[0] && propertyEarnings[0].total ? propertyEarnings[0].total : 0 ;
      obj1.loanEarnings = loanEarnings && loanEarnings[0] && loanEarnings[0].total ? loanEarnings[0].total : 0 ;
      obj1.total =  obj1.visitEarnings + obj1.propertyEarnings +  obj1.loanEarnings;
      result.earnings.push(obj1);
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
      let obj2 = {};
      obj2.title = "upcomingEarnings";
      obj2.claimRaised = claimRaised && claimRaised[0] && claimRaised[0].total ? claimRaised[0].total : 0 ;
      obj2.claimApproved = claimApproved && claimApproved[0] && claimApproved[0].total ? claimApproved[0].total : 0 ;
      obj2.paymentReceived = paymentReceived && paymentReceived[0] && paymentReceived[0].total ? paymentReceived[0].total : 0 ;
      obj2.total =  obj2.claimRaised +  obj2.claimApproved +  obj2.paymentReceived;
      result.earnings.push(obj2);
    
        //-------
      // Visit counts
      const visitCounts = await utils.aggregateData(Visit, [
          {
            $match: {
              brokerId: mongoose.Types.ObjectId(params.brokerId),
              visitStatus: { $in: ["completed", "pending", "followup", "negotiation", "bought"] }
            }
          },
          {
            $group: {
              _id: "$visitStatus",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              status: "$_id",
              count: 1
            }
          }
        ]);
        
        const obj3 = {
          completed: 0,
          pending: 0,
          followup: 0,
          negotiation: 0,
          bought: 0
        };
        for (const count of visitCounts) {
          obj3[count.status] = count.count;
        }
        
        result.earnings.push({
          title: "visitDetails",
          completeVisit: obj3.completed,
          pendingVisit: obj3.pending,
          followUpVisit: obj3.followup,
          negotiationVisit: obj3.negotiation,
          boughtVisit: obj3.bought,
          total: obj3.completed + obj3.pending + obj3.followup + obj3.negotiation + obj3.bought
        });
        
        // Loan query counts
        const loanQueryCounts = await utils.aggregateData(LoanQueryDetails, [
          {
            $match: {
              brokerId: mongoose.Types.ObjectId(params.brokerId),
              queryStatus: { $in: ["pending", "assigned", "matured", "notmatured"] }
            }
          },
          {
            $group: {
              _id: "$queryStatus",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              status: "$_id",
              count: 1
            }
          }
        ]);
        
        const obj4 = {
          pending: 0,
          assigned: 0,
          matured: 0,
          notmatured: 0
        };
        for (const count of loanQueryCounts) {
          obj4[count.status] = count.count;
        }
        
        result.earnings.push({
          title: "loanQuery",
          raisedQuery: obj4.pending,
          assignedQuery: obj4.assigned,
          maturedQuery: obj4.matured,
          notmaturedQuery: obj4.notmatured,
          total: obj4.pending + obj4.assigned + obj4.matured + obj4.notmatured
        });
      //------
      let obj5 = {};
      obj5.title = "claimApprovalRate";
      let totalClaim =  await utils.countDocuments(Claim, {brokerId:pararms.brokerId});
      let totalPaidClaim =  await utils.countDocuments(Claim, {claimStatus:"paid", brokerId:pararms.brokerId});
      let totalVisitClaim =  await utils.countDocuments(Claim, {claimStatus:"paid", claimType:"visit", brokerId:pararms.brokerId});
      let totalPropertyClaim =  await utils.countDocuments(Claim, {claimStatus:"paid", claimType:"property", brokerId:pararms.brokerId});
      let totalLoanClaim =  await utils.countDocuments(Claim, {claimStatus:"paid", claimType:"dsa", brokerId:pararms.brokerId});
      let claimApprovalRate = totalPaidClaim*100/totalClaim;
      let visitClaimRate = totalVisitClaim*100/totalClaim;
      let propertyClaimRate = totalPropertyClaim*100/totalClaim;
      let loanClaimRate = totalLoanClaim*100/totalClaim;
      obj5.claimApprovalRate = claimApprovalRate.toFixed(2);
      obj5.visitClaimRate = visitClaimRate.toFixed(2);
      obj5.propertyClaimRate = propertyClaimRate.toFixed(2);
      obj5.total = loanClaimRate.toFixed(2);
      result.earnings.push(obj5);
      let totalRefers = "0";
      let totalReferralEarnings = "0";
      let obj6 = {};
      obj6.title = "totalReferralEarnings"
      obj6.totalReferralEarnings = totalReferralEarnings;
      obj6.total = totalRefers;
      result.earnings.push(obj6);
    return sendSuccessMessage('success', result, res);
  };


exports.getBrokerEarningsById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(BrokerEarnings, {
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};