const { toLower, size } = require('lodash');
const utils = require('../utils/apiHelper');
const moment = require('moment');
const env = require('../config');
var html_to_pdf = require('html-pdf-node');
let S3 = require("../helpers/s3/index")({
  aws_s3: {
    accessKey: env.S3_ACCESSKEYID,
    accessKeyId: env.S3_ACCESSKEYID,
    secretAccessKey: env.S3_SECRETACCESSKEY,
    region: "ap-south-1",
    bucket: "nestohub",
  },
});
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Claim, BoughtProperty, Invoice, Notification , Visit } = require('../models');

exports.addClaim = async (payloadData, res) => {
  const pararms = payloadData.body;
  const data = await utils.upsertData(Claim, pararms,pararms);
  return sendSuccessMessage('Successfully added new claim', data, res);
};

exports.addVisitClaim = async (payloadData, res) => {
  const pararms = payloadData.body;
  const claimCheck = await utils.getSingleData(Claim, {
    query: { visitId: pararms.visitId,claimType:'visit', isDeleted: false },
  });
  if(claimCheck && size(claimCheck)){
    return sendErorMessage("CLaim Already Exist for this Visit", {}, res);
  }

  else{
    const visitDetails = await utils.getSingleData(Visit, {
      query: { _id:pararms.visitId },
    });
    if(!visitDetails.visitBrokerage){
      return sendErorMessage("No Brokerage For this Visit", {}, res);
    }
    let obj = {
      claimType:"visit",
      milestoneNumber:"1",
      brokerageAmount:visitDetails.visitBrokerege,
      visitId:pararms.visitId,
      propertyId:visitDetails.propertyId,
      builderId: visitDetails.builderId,
      brokerId:visitDetails.brokerId
    }
   await utils.upsertData(Claim,obj,obj);
   const data =  await utils.updateData(Visit,{_id:pararms.visitId},{isVisitClaimRaised:true});
   return sendSuccessMessage('Successfully added new claim',data, res);
  }
 

};


exports.updateClaim = async (payloadData, res) => {
  const pararms = payloadData.body;
  return sendSuccessMessage('Claim details successfully updated', data, res);
};
exports.updateClaimStatusForAdmin = async (payloadData, res) => {
  const pararms = payloadData.body;
  if(pararms.claimStatus=="paid"){
    pararms.isVisitClaimed = true
  }
  const data = await utils.updateData(Claim, { _id: pararms.id }, pararms);
  return sendSuccessMessage('Claim details successfully updated', data, res);
};


exports.updateClaimStatusForBroker = async (payloadData, res) => {
  const pararms = payloadData.body;
  let invoiceArr = [];
  const checkClaim = await utils.getSingleData(Claim, {
    query: { _id: pararms.id, isDeleted: false },
  });
  if (checkClaim.claimStatus=="submitted") {
    return sendErorMessage('Claim is already submitted by you', {}, res);
  }
  if(checkClaim.claimType=='property'){
    invoiceArr.push({
      invoiceAmount:checkClaim.brokerageAmount*10/100,
      brokerId: checkClaim.brokerId,
      builderId: checkClaim.builderId,
      claimId:pararms.id,
      paidTo:'admin'
    },{
      invoiceAmount:checkClaim.brokerageAmount*90/100,
      brokerId: checkClaim.brokerId,
      builderId: checkClaim.builderId,
      claimId:pararms.id,
      paidTo:'broker'
    })
  }
  else if(checkClaim.claimType=='dsa'){
    invoiceArr.push({
      invoiceAmount:"100",
      brokerId: checkClaim.brokerId,
      builderId: checkClaim.builderId,
      dsaId:checkClaim.dsaId,
      claimId:pararms.id,
      paidTo:'broker'
    })
  }
  else if(checkClaim.claimType=='visit'){
    invoiceArr.push({
      invoiceAmount:"100",
      brokerId: checkClaim.brokerId,
      builderId: checkClaim.builderId,
      claimId:pararms.id,
      paidTo:'broker'
    })
  }
  let invoices  =  await utils.insertManyData(Invoice, invoiceArr);
  pararms.invoiceIds = invoices.map(a => a._id);
  await utils.updateData(Claim, { _id: pararms.id }, pararms);
  
  const data = await utils.saveData(Notification, {
    title:"Claim Submitted",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    sendTo:"builder",
    sendFrom:"broker",
    builderId:checkClaim.builderId,
    brokerId: checkClaim.brokerId
  });

  return sendSuccessMessage('Claim details successfully updated',{}, res);
};

exports.deleteClaim = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(Claim, { _id: pararms.id }, { isDeleted: true });
  return sendSuccessMessage("claim details deleted successfully!", {}, res);
};

exports.getAllClaim = async (payloadData, res) => {
  const pararms = payloadData.query;
  const populates = ["brokerId", "builderId", {
    path: 'boughtPropertyId',
    model: 'bought',
    populate: [
        {
        path: 'visitId',
        model: 'visit',
        match:{}
    }]
}, "propertyId","invoiceIds","visitId","dsaId",{
  path: 'loanQueryId',
  model: 'loanQueryDetails',
  populate: [
      {
      path: 'clientId',
      model: 'customer',
      match:{}
  }]
}];
  const query = { isDeleted: false };
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  if (pararms.builderId) {
    query.builderId = pararms.builderId;
  }
  if (pararms.boughtPropertyId) {
    query.boughtPropertyId = pararms.boughtPropertyId;
  }
  if (pararms.propertyId) {
    query.propertyId = pararms.propertyId;
  }
  if (pararms.visitId) {
    query.visitId = pararms.visitId;
  }
  if (pararms.claimStatus) {
    query.claimStatus = pararms.claimStatus;
  }
  if (pararms.claimType && pararms.claimType!="all") {
    query.claimType = pararms.claimType;
  }
      if (pararms.search) {
        query['$or']=[
            {_id : { $regex: pararms.search, $options: "i" }},
            {companyName : { $regex: pararms.search, $options: "i" }},
            {createdAt : { $regex: pararms.search, $options: "i" }},
            {queryStatus : { $regex: pararms.search, $options: "i" }},
        ];
    }
  let data = await utils.getData(Claim, {
    query: query,
    sort: {milestoneNumber:1},
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });
  const count = await utils.countDocuments(Claim, query);
  data = JSON.parse(JSON.stringify(data));
  data.forEach(v => { v.totalCount = count });

  if (!data) {
    return sendErorMessage("No Claims Found", {}, res);
  }
  else {
    return sendSuccessMessage("successful in getting all claims", data, res);
  }
};

exports.getClaimById = async (payloadData, res) => {
  const pararms = payloadData.query;
  const populates = ["brokerId", "builderId", {
    path: 'boughtPropertyId',
    model: 'bought',
    populate: [
        {
        path: 'visitId',
        model: 'visit',
        match:{}
    }]
}, "propertyId","invoiceIds"];
  const data = await utils.getData(Claim, {
    query: { _id: pararms.id, isDeleted: false },
    populates,
  });
  return sendSuccessMessage("successful in getting a claim by id", data, res);
};

exports.getPropertiesEligibleForClaim = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = [];
  const query =[];
  const populates = ["brokerId", "propertyId", "builderId", "customerId"];
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  let propertyClaims = await utils.getData(BoughtProperty, {
    query: {isBrokerageClaimed:false,isDeleted:false},
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });

  for(let i=0;i<propertyClaims.length;i++){
 data.push({
  boughtPropertyId:propertyClaims[i]._id,
  images:propertyClaims[i].propertyId.images,
  propetyName:propertyClaims[i].propertyId.name,
  location:propertyClaims[i].propertyId.location,
  builderName:propertyClaims[i].builderId.name,
  brokerageValue:propertyClaims[i].propertyId.brokerageValue,
  customerName:propertyClaims[i].customerId.clientName,
  date:propertyClaims[i].createdAt,
  claimType:"brokerage"
 })
  }

  let visitClaims = await utils.getData(Visit, {
    query: {isVisitClaimed:false,visitBrokerege:{$ne:null},isDeleted:false,visitStatus:"completed"},
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates
  });

  for(let i=0;i<visitClaims.length;i++){
    data.push({
     visitId:visitClaims[i]._id,
     images:visitClaims[i].propertyId.images,
     propetyId:visitClaims[i].propertyId,
     propetyName:visitClaims[i].propertyId.name,
     location:visitClaims[i].propertyId.location,
     builderName:visitClaims[i].builderId.name,
     brokerageValue:visitClaims[i].propertyId.visitBrokerege,
     customerName:visitClaims[i].customerId.clientName,
     date:visitClaims[i].createdAt,
     claimType:"visit"
    })
     }
  return sendSuccessMessage("success", data, res);
};

exports.dummy = async (payloadData, res) => {
  let options = { format: 'A4' };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  
  let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
  // or //
  html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    console.log("PDF Buffer:-", pdfBuffer);
    return sendSuccessMessage("success", pdfBuffer.toString('base64'), res);
  });

};
