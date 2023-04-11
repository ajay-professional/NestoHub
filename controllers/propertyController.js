const { toLower, size, compact } = require("lodash");
const utils = require("../utils/apiHelper");
const moment = require("moment");
const env = require("../config");
const {
  sendErorMessage,
  sendSuccessMessage,
} = require("../helpers/sendResponse");
const { Property, Builder, BoughtProperty, Visit } = require("../models");

let S3 = require("../helpers/s3/index")({
  aws_s3: {
    accessKey: env.S3_ACCESSKEYID,
    accessKeyId: env.S3_ACCESSKEYID,
    secretAccessKey: env.S3_SECRETACCESSKEY,
    region: "ap-south-1",
    bucket: "nestohub",
  },
});


exports.addPropertyDetails = async (payloadData, res) => {
  const pararms = payloadData.body;
  pararms.email = toLower(pararms.email);
  if (pararms.paymentPlan) {
    pararms.paymentPlan = JSON.parse(pararms.paymentPlan);
  }
  if (pararms.loanApprovedByIds) {
    pararms.loanApprovedByIds = JSON.parse(pararms.loanApprovedByIds);
  }
  if (pararms.milestones) {
    pararms.milestones = JSON.parse(pararms.milestones);
  }
  if (pararms.currentlyComparing) {
    pararms.currentlyComparing = JSON.parse(pararms.currentlyComparing);
  }
  
  if (payloadData && payloadData.files && payloadData.files.images) {
    let images = Array.isArray(payloadData.files.images)
      ? payloadData.files.images
      : compact([payloadData.files.images]);
    let PromiseArr = [];
    for (let i = 0; i < images.length; i++) {
      key = S3.genKeyFromFilename(
        `propertyImages`,
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
    pararms.images = await Promise.all(PromiseArr);
  }

  if (payloadData && payloadData.files && payloadData.files.brochure) {
    let brochure = payloadData.files.brochure;
    let key = S3.genKeyFromFilename(
      `brochure`,
      brochure.name || "jpg",
      []
    );
    let brochureUrl;
    brochureUrl = await S3.uploadFile(
      key,
      brochure.data,
      { publicRead: true, mimeType: brochure.mimetype },
      1
    );
    pararms.brochureUrl = brochureUrl;
  }
  

  const data = await utils.saveData(Property, pararms);
  return sendSuccessMessage("Successfully added property!", data, res);
};


exports.updatePropertyDetails = async (payloadData, res) => {
  const pararms = payloadData.body;
  pararms.email = toLower(pararms.email);
  if (pararms.paymentPlan) {
    pararms.paymentPlan = JSON.parse(pararms.paymentPlan);
  }
  if (pararms.loanApprovedByIds) {
    pararms.loanApprovedByIds = JSON.parse(pararms.loanApprovedByIds);
  }
  if (pararms.milestones) {
    pararms.milestones = JSON.parse(pararms.milestones);
  }
  if (payloadData && payloadData.files && payloadData.files.images) {
    let images = Array.isArray(payloadData.files.images)
      ? payloadData.files.images
      : compact([payloadData.files.images]);
    let PromiseArr = [];
    for (let i = 0; i < images.length; i++) {
      key = S3.genKeyFromFilename(
        `propertyImages`,
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
    pararms.images = await Promise.all(PromiseArr);
  }
  if (payloadData && payloadData.files && payloadData.files.brochure) {
    let brochure = payloadData.files.brochure;
    let key = S3.genKeyFromFilename(
      `brochure`,
      brochure.name || "jpg",
      []
    );
    let brochureUrl;
    brochureUrl = await S3.uploadFile(
      key,
      brochure.data,
      { publicRead: true, mimeType: brochure.mimetype },
      1
    );
    pararms.brochureUrl = brochureUrl;
  }

  const data = await utils.updateData(Property, { _id: pararms.id }, pararms);
  return sendSuccessMessage("Successfully updated property! by aka", data, res);
};

exports.updateBrokerageDetails = async (payloadData, res) => {
  const pararms = payloadData.body;
  const data = await utils.updateData(Property, { _id: pararms.id }, pararms);
  return sendSuccessMessage("Successfully updated property!", data, res);
};

exports.deleteProperty = async (payloadData, res) => {
  const pararms = payloadData.query;
  const data = await utils.updateData(
    Property,
    { _id: pararms.id },
    { isDeleted: true },
    {}
  );
  return sendSuccessMessage("property deleted successfully!", data, res);
};

exports.getAllProperty = async (payloadData, res) => {
  let pararms = payloadData.query;

  const populates = ["builderId", "loanApprovedByIds","propertyType"];
  let query = { isDeleted: false, sort: { _id: 1 } };
  if (pararms.builderId) {
    query.builderId = pararms.builderId;
  }
  if (pararms.categoryId) {
    query.categoryId = pararms.categoryId;
  }
  if (pararms.isPropertySold) {
    query.isPropertySold = pararms.isPropertySold;
  }
  if (pararms.isPromoted) {
    query.isPromoted = pararms.isPromoted;
  }
  if (pararms.search) {
    query.name = { $regex: pararms.search, $options: "i" };
  }
  let data = await utils.getData(Property, {
    query: query,
    sort: { _id: -1 },
    pageSize: pararms.pageSize,
    pageNo: pararms.pageNo,
    populates,
  });
  const count = await utils.countDocuments(Property, query);
  data = JSON.parse(JSON.stringify(data));
  for(let i=0;i<data.length;i++){
    data[i].totalCount = count;
    data[i].noOfVisits =  await utils.countDocuments(Visit, {propertyId:data[i]._id});
  }
 // data.forEach(v => { v.totalCount = count });
  IdsArr = data.map(function (obj) {
    return obj._id;
  });

  await utils.updateMany(Property, { _id: { $in: IdsArr } }, { $inc: { searchCount: 1 } })

  return sendSuccessMessage("successful in getting all properties by NestoHub", data, res);
};

exports.getPropertyById = async (payloadData, res) => {
  const pararms = payloadData.query;
  const populates = ["builderId", "loanApprovedByIds",'propertyType'];
  if (pararms.builderId) {
    query.builderId = pararms.builderId;
  }
  let data = await utils.getData(Property, {
    query: { _id: pararms.id, isDeleted: false },
    populates,
  });
  let specificationArr = [];
  data = JSON.parse(JSON.stringify(data));
  for(let i=0;i<data[0].floorPlanAndPricing.length;i++){
    if(data[0].floorPlanAndPricing[i].specifications && data[0].floorPlanAndPricing[i].specifications.length!=0){
      specificationArr.push(...data[0].floorPlanAndPricing[i].specifications)
    }
    data[0].unitType.push(data[0].floorPlanAndPricing[i].unitType);
    data[0].unitType = [...new Set(data[0].unitType)];
  }

  data[0].specificationArr = specificationArr;
  await utils.updateData(Property, { _id: pararms.id }, { $inc: { "viewsCount": 1 } });
  return sendSuccessMessage("success in getting property by id", data, res);
};

exports.addFloorPlanAndPricing = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (pararms.specifications) {
    pararms.specifications = JSON.parse(pararms.specifications);
  }
  if (pararms.furnishingDetails) {
    pararms.furnishingDetails = JSON.parse(pararms.furnishingDetails);
  }
  if (payloadData && payloadData.files && payloadData.files.floorPlanImage) {
    let floorPlanImage = payloadData.files.floorPlanImage;
    let key = S3.genKeyFromFilename(
      `floorPlanImage`,
      floorPlanImage.name || "jpg",
      []
    );
    let floorPlanImageUrl;
    floorPlanImageUrl = await S3.uploadFile(
      key,
      floorPlanImage.data,
      { publicRead: true, mimeType: floorPlanImage.mimetype },
      1
    );
    pararms.floorPlanImageUrl = floorPlanImageUrl;
  }

  await utils.updateData(Property, { _id: pararms.mainId },
    {
      $push: {
        floorPlanAndPricing: pararms
      }
    },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.addAmenities = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.icon) {
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

exports.updateFloorPlanAndPricing = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (pararms.specifications) {
    pararms.specifications = JSON.parse(pararms.specifications);
  }
  if (pararms.furnishingDetails) {
    pararms.furnishingDetails = JSON.parse(pararms.furnishingDetails);
  }
  if (payloadData && payloadData.files && payloadData.files.floorPlanImage) {
    let floorPlanImage = payloadData.files.floorPlanImage;
    let key = S3.genKeyFromFilename(
      `floorPlanImage`,
      floorPlanImage.name || "jpg",
      []
    );
    let floorPlanImageUrl;
    floorPlanImageUrl = await S3.uploadFile(
      key,
      floorPlanImage.data,
      { publicRead: true, mimeType: floorPlanImage.mimetype },
      1
    );
    pararms.floorPlanImageUrl = floorPlanImageUrl;
  }

  await utils.updateData(Property, {
    _id: pararms.mainId,
    "floorPlanAndPricing._id": pararms.floorPlanId,
  }, {
    $set: {
      "floorPlanAndPricing.$.floorPlanImageUrl": pararms.floorPlanImageUrl,
      "floorPlanAndPricing.$.areaSquareFeet": pararms.areaSquareFeet,
      "floorPlanAndPricing.$.areaSquareMeter": pararms.areaSquareMeter,
      "floorPlanAndPricing.$.price": pararms.price,
      "floorPlanAndPricing.$.onesqft": pararms.onesqft,
      "floorPlanAndPricing.$.unitType": pararms.unitType,
      "floorPlanAndPricing.$.quantity": pararms.quantity,
      "floorPlanAndPricing.$.furnishingStatus": pararms.furnishingStatus,
    }
  });
  return sendSuccessMessage('success', {}, res);
};

exports.updateAmenities = async (payloadData, res) => {
  const pararms = payloadData.body;

  if (payloadData && payloadData.files && payloadData.files.icon) {
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
  await utils.updateData(Property, {
    _id: pararms.mainId,
    "amenities._id": pararms.amenitiesId,
  }, {
    $set: {
      "amenities.$.iconUrl": pararms.iconUrl,
      "amenities.$.name": pararms.name
    }
  });
  return sendSuccessMessage('success', {}, res);
};

exports.deleteFloorPlanAndPricing = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(Property, { _id: pararms.mainId },
    { "$pull": { "floorPlanAndPricing": { "_id": pararms.floorPlanId } } },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.getAllFloorPlanAndPricing = async (payloadData, res) => {
  const pararms = payloadData.body;
  let query = { _id: pararms.id, isDeleted: false };
 
  let data = await utils.getData(Property, {
    query: query,
    fields: ['floorPlanAndPricing'],
  });
  data = data[0].floorPlanAndPricing;
  if(pararms.unitType && pararms.unitType.length!=0){
  data = data.filter(floorPlan=>{
    return pararms.unitType.includes(floorPlan.unitType);
  })
  }
  return sendSuccessMessage('success', data, res);
};

exports.getFloorPlanAndPricingById = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: {
      _id: pararms.mainId,
      "floorPlanAndPricing._id": pararms.floorPlanId,
      isDeleted: false
    },
    fields: ['floorPlanAndPricing.$'],
  });
  return sendSuccessMessage('success', data, res);
};

exports.deleteAmenities = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(Property, { _id: pararms.mainId },
    { "$pull": { "amenities": { "_id": pararms.amenitiesId } } },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.getAllAmenities = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: { _id: pararms.id, isDeleted: false, },
    fields: ['amenities'],
  });
  return sendSuccessMessage('success', data, res);
};

exports.getAmenitiesById = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: {
      _id: pararms.mainId,
      "amenities._id": pararms.amenitiesId,
      isDeleted: false
    },
    fields: ['amenities.$'],
  });
  return sendSuccessMessage('success', data, res);
};

//////////////// LOCATION ADVANTAGE ////////////////////

exports.addLocationAdvantages = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.icon) {
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
        locationAdvantages: pararms
      }
    },
  );
  return sendSuccessMessage('success', {}, res);
};
exports.updateLocationAdvantages = async (payloadData, res) => {
  const pararms = payloadData.body;

  if (payloadData && payloadData.files && payloadData.files.icon) {
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
  await utils.updateData(Property, {
    _id: pararms.mainId,
    "locationAdvantages._id": pararms.locationAdvantagesId,
  }, {
    $set: {
      "locationAdvantages.$.iconUrl": pararms.iconUrl,
      "locationAdvantages.$.name": pararms.name,
      "locationAdvantages.$.distance": pararms.distance
    }
  });
  return sendSuccessMessage('success', {}, res);
};

exports.deleteLocationAdvantages = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(Property, { _id: pararms.mainId },
    { "$pull": { "locationAdvantages": { "_id": pararms.locationAdvantagesId } } },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.getAllLocationAdvantages = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: { _id: pararms.id, isDeleted: false, },
    fields: ['locationAdvantages'],
  });
  return sendSuccessMessage('success', data, res);
};

exports.getLocationAdvantagesById = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: {
      _id: pararms.mainId,
      "locationAdvantages._id": pararms.locationAdvantagesId,
      isDeleted: false
    },
    fields: ['locationAdvantages.$'],
  });
  return sendSuccessMessage('success', data, res);
};
///////////////


/////////////// property Ads Detail (MAP)///////////////

exports.addPropertyAdvertiseMentDetails = async (payloadData, res) => {
  const pararms = payloadData.body;
  if (payloadData && payloadData.files && payloadData.files.icon) {
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
        propertyAdvertiseMentDetails: pararms
      }
    },
  );
  return sendSuccessMessage('success', {}, res);
};
exports.updatePropertyAdvertiseMentDetails = async (payloadData, res) => {
  const pararms = payloadData.body;

  if (payloadData && payloadData.files && payloadData.files.icon) {
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
  await utils.updateData(Property, {
    _id: pararms.mainId,
    "propertyAdvertiseMentDetails._id": pararms.propertyAdvertiseMentDetailsId,
  }, {
    $set: {
      "propertyAdvertiseMentDetails.$.iconUrl": pararms.iconUrl,
      "propertyAdvertiseMentDetails.$.name": pararms.name,
      "propertyAdvertiseMentDetails.$.location": pararms.location,
      "propertyAdvertiseMentDetails.$.distance": pararms.distance
    }
  });
  return sendSuccessMessage('success', {}, res);
};

exports.deletePropertyAdvertiseMentDetails = async (payloadData, res) => {
  const pararms = payloadData.query;
  await utils.updateData(Property, { _id: pararms.mainId },
    { "$pull": { "propertyAdvertiseMentDetails": { "_id": pararms.propertyAdvertiseMentDetailsId } } },
  );
  return sendSuccessMessage('success', {}, res);
};

exports.getAllPropertyAdvertiseMentDetails = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: { _id: pararms.id, isDeleted: false, },
    fields: ['propertyAdvertiseMentDetails'],
  });
  return sendSuccessMessage('success', data, res);
};

exports.getPropertyAdvertiseMentDetailsById = async (payloadData, res) => {
  const pararms = payloadData.query;
  let data = await utils.getData(Property, {
    query: {
      _id: pararms.mainId,
      "propertyAdvertiseMentDetails._id": pararms.propertyAdvertiseMentDetailsId,
      isDeleted: false
    },
    fields: ['propertyAdvertiseMentDetails.$'],
  });
  return sendSuccessMessage('success', data, res);
};
///////////////////////////////////////////////////////////

////////////////// add currently camparing ///////////////////

exports.updateCurrentlyComparing = async (payloadData, res) => {
  const pararms = payloadData.body;
  for(let i=0;i<pararms.currentlyComparing.length;i++){
    pararms.currentlyComparing[i].color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
  }
  await utils.updateData(Property,{_id:pararms.id},{currentlyComparing:pararms.currentlyComparing});
  return sendSuccessMessage('success', {}, res);
};

/////////////////////////////////////////////////////////////
exports.getPropertiesAnalyticsForIndividualProperty = async (payloadData, res) => {
  const pararms = payloadData.query;

  let data = {};
  data.soldProperties = await utils.countDocuments(BoughtProperty, { builderId: pararms.builderId, propertyId: pararms.propertyId, isDeleted: false });
  data.numberOfvisit = await utils.countDocuments(Visit, { builderId: pararms.builderId, propertyId: pararms.propertyId, isDeleted: false });

  data.shareCount = 10
  //data.search = 10
  return sendSuccessMessage('successful in getting a builder by id', data, res);
};

exports.script = async (payloadData, res) => {
  let data = await utils.getData(Property,{isDeleted:false});
  return sendSuccessMessage('done', data, res);
};