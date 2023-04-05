const utils = require("../utils/apiHelper");
const moment = require("moment");
const { toLower, size, compact } = require("lodash");
const {
  sendErorMessage,
  sendSuccessMessage,
} = require("../helpers/sendResponse");
const { BoughtProperty, Property, Claim, Customer } = require("../models");
const env = require("../config");
let S3 = require("../helpers/s3/index")({
  aws_s3: {
    accessKey: env.S3_ACCESSKEYID,
    accessKeyId: env.S3_ACCESSKEYID,
    secretAccessKey: env.S3_SECRETACCESSKEY,
    region: "ap-south-1",
    bucket: "nestohub",
  },
});

exports.addBoughtProperty = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.documents) {
    let images = Array.isArray(payloadData.files.documents)
      ? payloadData.files.documents
      : compact([payloadData.files.documents]);
    let PromiseArr = [];
    for (let i = 0; i < images.length; i++) {
      key = S3.genKeyFromFilename(
        `boughtPropertyDocuments`,
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
  let customerData = await utils.getData(Customer, {
    query: { _id: pararms.customerId },
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    fields: ['_id', 'clientName']
  });
  
  pararms.clientName = customerData[0].clientName;

  const data = await utils.saveData(BoughtProperty, pararms);

  const propertyDetails = await utils.getData(Property, {
    query: { _id: pararms.propertyId },
    fields: ['_id', 'milestones','brokerageValue','brokerageType']
  });
console.log(propertyDetails);
 let totalBrokerage ;
 if(propertyDetails.length==0){
  return sendErorMessage('No Property Found', {}, res);
 }
 if(!propertyDetails[0].brokerageType){
  return sendErorMessage('No Brokerage type for Property Found', {}, res);
 }
 if(propertyDetails[0].brokerageType=="amount"){
  totalBrokerage = propertyDetails[0].brokerageValue;
 } 
 else if(propertyDetails[0].brokerageType=="percentage"){
  totalBrokerage = pararms.sellingPrice*propertyDetails[0].brokerageValue/100;
 }

  let milestones = propertyDetails[0].milestones;
  let claimArr = [];
  for (let i = 0; i < milestones.length; i++) {
    claimArr.push({
      claimType: "property",
      milestoneNumber: i + 1,
      brokeragePercentage: milestones[i].brokerage,
      brokerageAmount:totalBrokerage*milestones[i].brokerage/100,
      date: moment().date(),
      propertyId: pararms.propertyId,
      boughtPropertyId: data._id,
      builderId: pararms.builderId,
      brokerId: pararms.brokerId,
    });
  }

  await utils.insertManyData(Claim, claimArr);
  // const data2 = await utils.updateData(Property, { _id: pararms.id }, { isPropertySold: true});
  return sendSuccessMessage("Successful", data, res);
};

exports.updateBoughtProperty = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.documents) {
    let images = Array.isArray(payloadData.files.documents)
      ? payloadData.files.documents
      : compact([payloadData.files.documents]);
    let PromiseArr = [];
    for (let i = 0; i < images.length; i++) {
      key = S3.genKeyFromFilename(
        `boughtPropertyDocuments`,
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
  const data = await utils.updateData(
    BoughtProperty,
    { _id: pararms.id },
    pararms
  );
  return sendSuccessMessage("Bought details successfully updated", data, res);
};

exports.deleteBoughtProperty = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(
    BoughtProperty,
    { _id: pararms.id },
    { isDeleted: true }
  );
  return sendSuccessMessage("Bought details deleted successfully!", {}, res);
};
// recently sold out property

exports.getAllBoughtProperty = async (payloadData, res) => {
  let pararms = payloadData.query;
  const populates = ["brokerId",   {
    path: 'propertyId',
    model: 'property',
    populate: [
        {
        path: 'loanApprovedByIds',
        model: 'bank',
        match:{}
    }]
}, "builderId", "customerId", "visitId"];
  let query = { isDeleted: false };
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  if (pararms.builderId) {
    query.builderId = pararms.builderId;
  }
  if (pararms.propertyId) {
    query.propertyId = pararms.propertyId;
  }
  if (pararms.customerId) {
    query.customerId = pararms.customerId;
  }
  if (pararms.visitId) {
    query.visitId = pararms.visitId;
  }
  // if (pararms.bankId) {
  //   query.bankId = pararms.bankId;
  // }
  let data = await utils.getData(BoughtProperty, {
    query: query,
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });
  const count = await utils.countDocuments(BoughtProperty, query);
  data = JSON.parse(JSON.stringify(data));
  data.forEach(v => { v.totalCount = count });
  return sendSuccessMessage("success", data, res);
};

exports.getBoughtPropertyById = async (payloadData, res) => {
  const pararms = payloadData.query;

  const populates = ["brokerId", "customerId"];
  const data = await utils.getData(BoughtProperty, {
    query: { _id: pararms.id, isDeleted: false },
    populates,
  });
  return sendSuccessMessage(
    "successful in getting a bought property by id",
    data,
    res
  );
};


