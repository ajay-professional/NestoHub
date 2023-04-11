const Joi = require('joi');


exports.addPropertyDetails = Joi.object().keys({
    isRera: Joi.string().required(),
    isBestSelling: Joi.string().required(),
    possessionDate: Joi.string().required(),
    name: Joi.string().required(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    discountDescription: Joi.string().required(),
    location: Joi.string().required(),
    propertyType: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    constructionStatus: Joi.string().required(),
    paymentPlan: Joi.string().required(),
    nearbyAreas: Joi.string().required(),
    propertyDescription: Joi.string().required(),
    saleType: Joi.string().required(),
    furnishingStatus: Joi.string().required(),
    showOnly: Joi.string().required(),
    loanApprovedByIds: Joi.string().required(),
    milestones:  Joi.string().required(),
    currentlyComparing: Joi.string().required(),
    subPropertyType:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    termAndCondition: Joi.string().required(),
    visitBrokerage:Joi.string().optional(),
    isRecommended: Joi.string().optional(),
    ageOfProperty: Joi.string().optional(),
    recommendedProperties: Joi.string().optional(),
});

exports.updatePropertyDetails = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    isRera: Joi.string().required(),
    isBestSelling: Joi.string().required(),
    possessionDate: Joi.string().required(),
    name: Joi.string().required(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    discountDescription: Joi.string().required(),
    location: Joi.string().required(),
    propertyType: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    constructionStatus: Joi.string().required(),
    paymentPlan: Joi.string().required(),
    nearbyAreas: Joi.string().required(),
    propertyDescription: Joi.string().required(),
    saleType: Joi.string().required(),
    furnishingStatus: Joi.string().required(),
    showOnly: Joi.string().required(),
    loanApprovedByIds: Joi.string().required(),
    milestones:  Joi.string().required(),
    currentlyComparing: Joi.string().required(),
    subPropertyType:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    termAndCondition: Joi.string().required(),
    visitBrokerage:Joi.string().optional(),
    isRecommended: Joi.string().optional(),
    recommendedProperties: Joi.string().optional(),
});



exports.updateBrokerageDetails = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerageType:Joi.string().required().valid('percentage','amount'),
    brokerageValue:Joi.string().required(),
    brokerageTerms:Joi.string().optional(),
})

exports.updateProperty = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    isRera: Joi.string().required(),
    possessionDate: Joi.string().required(),
    name: Joi.string().required(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    discountDescription: Joi.string().required(),
    floorPlanAndPricing: Joi.array().items(Joi.object().keys({
        length: Joi.string().required(),
        breadth: Joi.string().required(),
        price: Joi.string().required(),
        unitType: Joi.string().required(),
        quantity: Joi.string().required()
    })),
    location: Joi.string().required(),
    propertyType: Joi.array().optional().items(Joi.string().optional()).required(),
    unitType: Joi.array().optional().items(Joi.string().optional()).required(),
    brokeragePayoutPlan: Joi.string().required(),
    amenities:Joi.array().items(Joi.object().keys({
        name:Joi.string().required(),
    })),
    locationAdvantages: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        distance: Joi.string().required(),
    })),
    latitude: Joi.string().required(),
    longitudinal: Joi.string().required(),

    constructionStatus: Joi.string().required(),
    paymentPlan: Joi.array().items(Joi.object().keys({
        payment: Joi.string().required(),
        milestone: Joi.string().required(),
    })),
    propertyDescription: Joi.string().required(),
    saleType: Joi.string().required(),
    showOnly: Joi.string().required(),
    loanApprovedByIds: Joi.array().optional().items(Joi.string().optional()).required(),
    milestones: Joi.array().items(Joi.object().keys({
        condition: Joi.string().required(),
        brokerage: Joi.string().required(),
    })),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    termAndCondition: Joi.string().required(),
    isPropertySold: Joi.string().required(),
    isPromoted: Joi.string().required(),
    visitBrokerage:Joi.string().optional()
});

exports.id = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.filters = Joi.object().keys({
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyType: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    isPropertySold: Joi.string().optional(),
    search: Joi.string().optional().trim().allow(""),
    isPromoted: Joi.string().optional(),
    isFeatured: Joi.string().optional(),
    isBestSelling: Joi.string().optional(),
    
    isRecommended: Joi.string().optional()
});


exports.addFloorPlanAndPricing = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    length: Joi.string().required(),
    breadth: Joi.string().required(),
    price: Joi.string().required(),
    onesqft: Joi.string().required(),
    unitType: Joi.string().required(),
    quantity: Joi.string().required(),
    furnishingStatus: Joi.string().required(),
    specifications:Joi.string().optional(),
    furnishingDetails:Joi.string().optional()
})




exports.updateFloorPlanAndPricing = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    floorPlanId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    length: Joi.string().required(),
    breadth: Joi.string().required(),
    price: Joi.string().required(),
    unitType: Joi.string().required(),
    quantity: Joi.string().required(),
    furnishingStatus: Joi.string().required(),
    specifications:Joi.string().optional(),
    furnishingDetails:Joi.string().optional()
})




exports.deleteFloorPlanAndPricing = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    floorPlanId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 
exports.getFloorPlanAndPricingById = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    floorPlanId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 



exports.getAllFloorPlanAndPricing = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    unitType:Joi.array().items(Joi.string().optional()).optional(),
}) 

exports.addAmenities = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
})

exports.updateAmenities = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    amenitiesId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
})

exports.deleteAmenities = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    amenitiesId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
})


exports.getAllAmenities = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 

exports.getAmenitiesById = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    amenitiesId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 
/////////////////////////////  Location advantage///////////////////////////
exports.addLocationAdvantages = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    distance:Joi.string().required(),
})

exports.updateLocationAdvantages = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    locationAdvantagesId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    distance:Joi.string().required(),
})

exports.deleteLocationAdvantages = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    locationAdvantagesId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
})


exports.getAllLocationAdvantages = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 

exports.getLocationAdvantagesById = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    locationAdvantageId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 
//////////////////////////////////////

///////////////////ADvertiese property ADS////////////////////
exports.addPropertyAdvertiseMentDetails = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    location:Joi.string().required(),
    distance:Joi.string().required(),
})

exports.updatePropertyAdvertiseMentDetails = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyAdvertiseMentDetailsId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    location:Joi.string().required(),
    distance:Joi.string().required(),
})

exports.deletePropertyAdvertiseMentDetails = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyAdvertiseMentDetailsId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
})


exports.getAllPropertyAdvertiseMentDetails = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 

exports.getPropertyAdvertiseMentDetailsById = Joi.object().keys({
    mainId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyAdvertiseMentDetailsId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 
//////////////////

/////////// property Camparing///////////////

exports.updateCurrentlyComparing = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    currentlyComparing:Joi.array().items(Joi.object().keys({
        withLocality:Joi.string().required(),
        currentPrice:Joi.string().required(),
        last1Year:Joi.string().required(),
        last3Year:Joi.string().required(),
        last4Year:Joi.string().required(),
    }))
})

////////////////////////////////////////////

exports.getPropertiesAnalyticsForIndividualProperty = Joi.object().keys({
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
}) 