const { toLower, size } = require("lodash");
const utils = require("../utils/apiHelper");
const moment = require("moment");
const env = require("../config");
const {
  sendErorMessage,
  sendSuccessMessage,
} = require("../helpers/sendResponse");
const {
  Visit,
  Customer,
  Property,
  Builder,
  Broker,
  Requirement,
  BoughtProperty,
} = require("../models");

exports.addVisit = async (payloadData, res) => {
  const pararms = payloadData.body;
  pararms.email = toLower(pararms.email);
  const checkProperty = await utils.getSingleData(Property, {
    query: {
      _id:pararms.propertyId,
      isDeleted: false,
    },
    fields: ["_id", "visitBrokerage"],
  });

  if(checkProperty && checkProperty.visitBrokerage){
    pararms.visitBrokerage = checkProperty.visitBrokerage
  }
  // if (!size(checkCustomer)) {
  //   let data = await utils.saveData(Customer, {
  //     clientName: pararms.clientName,
  //     email: pararms.email,
  //     phoneNumber: pararms.phoneNumber,
  //     unitType: pararms.unitType,
  //     preferredLocation: pararms.preferredLocation,
  //     minPrice: pararms.minPrice,
  //     maxPrice: pararms.maxPrice,
  //     brokerId: pararms.brokerId,
  //   });
  //   customerId = data._id;
  // } else {
  //   customerId = checkCustomer[0]._id;
  // }
  if (!pararms.customerId) {
    const checkCustomer = await utils.getData(Customer, {
      query: {
        phoneNumber: pararms.phoneNumber,
        brokerId: pararms.brokerId,
        isDeleted: false,
      },
      fields: ["_id", "phoneNumber", "brokerId"],
    });
    if (checkCustomer.length > 0) {
      return sendErorMessage("Customer already exists for this Broker , please send customerId", {}, res);
    }
    let data = await utils.saveData(Customer, {
      clientName: pararms.clientName,
      email: pararms.email,
      phoneNumber: pararms.phoneNumber,
      unitType: pararms.unitType,
      preferredLocation: pararms.preferredLocation,
      minPrice: pararms.minPrice,
      maxPrice: pararms.maxPrice,
      brokerId: pararms.brokerId,
    });
    pararms.customerId = data._id;
  }
  if (!pararms.requirementId) {
    let requirement = await utils.saveData(Requirement, {
      unitType: pararms.unitType,
      preferredLocation: pararms.preferredLocation,
      minPrice: pararms.minPrice,
      maxPrice: pararms.maxPrice,
      customerId: pararms.customerId,
      brokerId: pararms.brokerId,
    });
    pararms.requirementId = requirement._id;
  }

  const getBuilder = await utils.getData(Builder, {
    query: { _id: pararms.builderId, isDeleted: false },
    fields: ["_id", "phoneNumber"],
  });

  //code to send otp to builder number

  let otp = 123456;

  let data = await utils.saveData(Visit, {
    ...pararms,
    otp: otp,
  });
  return sendSuccessMessage("Success", data, res);
};

exports.verifyOtp = async (payloadData, res) => {
  const pararms = payloadData.body;
  let visitId = pararms.visitId;
  let otp = pararms.otp;

  const checkPhone = await utils.getData(Visit, {
    query: { _id: visitId, otp: otp, isDeleted: false },
    fields: ["_id","isOtpVerified"],
  });
  if (checkPhone.length > 0) {
    let data = await utils.updateData(Visit, { _id: visitId }, { isOtpVerified: true });
    return sendSuccessMessage("Otp Successfully Verified", data, res);
  } else {
    let data2 = await utils.getData(Visit, {
      query: { _id: visitId, isDeleted: false },
      fields: ["_id","isOtpVerified"],
    });
    return sendErorMessage("Your Otp is incorrect", data2, res);
  }
};

exports.resendOtp = async (payloadData, res) => {
  const pararms = payloadData.body;
  let visitId = pararms.visitId;
  let builderId = pararms.builderId;

  let otp = 123456;
  const getBuilder = await utils.getData(Builder, {
    query: { _id: pararms.builderId, isDeleted: false },
    fields: ["_id", "phoneNumber"],
  });
  //code to send otp to builder number

  await utils.updateData(Visit, { _id: visitId }, { otp: otp });

  return sendSuccessMessage("Otp resent", {}, res);
};

exports.visitSummary = async (payloadData, res) => {
  const pararms = payloadData.body;
  const data = await utils.updateData(Visit, { _id: pararms.id }, pararms);
  let overAllRating = parseInt(pararms.overAllRating);
  const rating = await utils.getData(Builder, {
    query: { _id: data.builderId, isDeleted: false },
    fields: ["_id", "rating"],
  });
  let newRat = (rating[0].rating + overAllRating) / 2;
  await utils.updateData(Builder, { _id: data.builderId }, { rating: newRat });

  return sendSuccessMessage("Visit details successfully updated", data, res);
};
exports.visitComment = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.file) {
    let icon = payloadData.files.icon;
    let key = S3.genKeyFromFilename(
      `icon`,
      icon.name || "jpg",
      []
    );
    let iconUrl;
    iconUrl = await S3.uploadFile(
      key,
      icon.data,
      { publicRead: true, mimeType: icon.mimetype },
      1
    );
    pararms.iconUrl = iconUrl;
  }
  await utils.updateData(Property, { _id: pararms.mainId },
    {
      $push: {
        amenities: pararms
      }
    },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.deleteVisit = async (payloadData, res) => {
  const pararms = payloadData.query;

  await utils.updateData(Visit, { _id: pararms.id }, { isDeleted: true });
  return sendSuccessMessage("visit deleted successfully!", {}, res);
};
exports.getAllVisit = async (payloadData, res) => {
  let pararms = payloadData.query;
  const populates = ["brokerId", "builderId", "customerId"];
  let query = { isDeleted: false };
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  if (pararms.isPromoted) {
    query.isPromoted = pararms.isPromoted;
  }
  if (pararms.requirementId) {
    query.requirementId = pararms.requirementId;
  }
  if (pararms.customerId) {
    query.customerId = pararms.customerId;
  } 
  // builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
  // propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
  // visitStatus:Joi.string().valid('pending', 'completed', 'followup', 'negotiation', 'bought').optional(),
  let data = await utils.getData(Visit, {
    query: query,
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });

  const count = await utils.countDocuments(Visit, query);
  data = JSON.parse(JSON.stringify(data));
  data.forEach(v => { v.totalCount = count });
  return sendSuccessMessage("successful in getting all visit", data, res);
};

exports.getAllVisitAlert = async (payloadData, res) => {
  const pararms = payloadData.query;
  const populates = ["brokerId", "builderId", "customerId", "propertyId"];
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'numeric', year: 'numeric'
  }).replaceAll("/", '-');

  let query = {date:formattedDate, isDeleted: false };
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  let data = await utils.getData(Visit, {
    query: query,
    populates
  });
  return sendSuccessMessage("successful in getting all visit", data, res);
};
exports.getAllVisit = async (payloadData, res) => {
  let pararms = payloadData.query;
  const populates = ["brokerId", "builderId", "customerId"];
  let query = { isDeleted: false };
  if (pararms.brokerId) {
    query.brokerId = pararms.brokerId;
  }
  if (pararms.isPromoted) {
    query.isPromoted = pararms.isPromoted;
  }
  if (pararms.requirementId) {
    query.requirementId = pararms.requirementId;
  }
  if (pararms.customerId) {
    query.customerId = pararms.customerId;
  }
  let data = await utils.getData(Visit, {
    query: query,
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });

  const count = await utils.countDocuments(Visit, query);
  data = JSON.parse(JSON.stringify(data));
  data.forEach(v => { v.totalCount = count });
  return sendSuccessMessage("successful in getting all visit", data, res);
};
exports.getVisitById = async (payloadData, res) => {
  const pararms = payloadData.query;
  const populates = ["brokerId", "builderId", "customerId", "propertyId"];
  const data = await utils.getData(Visit, {
    query: { _id: pararms.id, isDeleted: false },
    populates,
  });
  return sendSuccessMessage("success", data, res);
};

exports.getPendingVisitAnalytics = async (payloadData, res) => {

  const pararms = payloadData.query;
  let obj = { builderId: pararms.builderId, isDeleted: false }
  if (pararms.propertyId) {
    obj.propertyId = pararms.propertyId;
  }
  let data = {};

  data.pendingVisit = await utils.countDocuments(Visit, { ...obj, visitStatus: "pending" });
  data.completedVisit = await utils.countDocuments(Visit, { ...obj, visitStatus: "completed" });
  data.followUpVisit = await utils.countDocuments(Visit, { ...obj, visitStatus: "followup" });
  data.negotiationVisit = await utils.countDocuments(Visit, { ...obj, visitStatus: "negotiation" });
  data.boughtVisit = await utils.countDocuments(Visit, { ...obj, visitStatus: "bought" });


  return sendSuccessMessage('successful ', data, res);
};
