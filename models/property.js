const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema({
    images:[{ type: String, default: null }],
    subCompany:{type: String, default: null},
    isRera:{type: Boolean, default: null},
    possessionDate:{ type: String, default: null },
    name: { type: String, default: null },
    minPrice: { type: String, default: null },
    maxPrice: { type: String, default: null },
    discountDescription:{ type: String, default: null },
    floorPlanAndPricing:[{ 
        floorPlanImageUrl:{type: String, default: null},
        areaSquareFeet:{type: String, default: null},
        areaSquareMeter:{type: String, default: null},
        price:{type: String, default: null},
        onesqft:{type: String, default: null},
        unitType:{type: String, default: null},
        quantity:{type: String, default: null},
        furnishingStatus:{ type: String, default: null },
        specifications:[{
            name:{ type: String, default: null },
            length:{ type: String, default: null },
            breadth:{ type: String, default: null }
        }],
        furnishingDetails:[{type: String, default: null}]
     }],
    location: { type: String, default: null },
    propertyType:{ type: Schema.ObjectId, ref: 'propertyCategory', default: null },
    subPropertyType:{ type: Schema.ObjectId, ref: 'propertySubCategory', default: null },
    nearbyAreas:[ { type: String, default: null }],
    brokerageType:{ type: String, default: null },
    brokerageValue:{ type: String, default: null },
    brokerageTerms:{ type: String, default: null },
    amenities: [{ 
        iconUrl:{type: String, default: null},
        name:{type: String, default: null},
     }],
    locationAdvantages:[{ 
        iconUrl:{type: String, default: null},
        name:{type: String, default: null},
        distance:{type: String, default: null}
    }],
    propertyAdvertiseMentDetails:[{ 
        iconUrl:{type: String, default: null},
        name:{type: String, default: null},
        location:{type: String, default: null},
        distance:{type: String, default: null}
    }],
    currentlyComparing: [{ 
        color:{type: String, default: null},
        withLocality:{type: String, default: null},
        currentPrice:{type: String, default: null},
        last1Year:{type: String, default: null},
        last3Year:{type: String, default: null},
        last4Year:{type: String, default: null}
     }],
     latitude: { type: String, default: null },
     longitude: { type: String, default: null },
    constructionStatus:{ type: String, default: null },
    paymentPlan: [{ 
        payment:{type: String, default: null},
        milestone:{type: String, default: null},
     }],
    propertyDescription:{ type: String, default: null },
   
    saleType:{ type: String, default: null },
    showOnly:{ type: String, default: null },
    loanApprovedByIds: [{ type: Schema.ObjectId, ref: 'bank', default: null }],
    brochureUrl:{ type: String, default: null },
    milestones:[{
        condition:{ type: String, default: null },
        brokerage:{ type: String, default: null },
    }],
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    termAndCondition:{ type: String, default: null },
    isPropertySold: { type: Boolean, default: false },
    isPromoted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    visitBrokerage:{type:String,default:null},
    viewsCount:{type:Number,default:0},
    searchCount:{type:Number,default:0},
    isRecommended:{ type: Boolean, default: false },
    recommendedProperties: { type: Schema.ObjectId, ref: 'property', default: null },
}, {
    timestamps: true,
});
propertySchema.set('toObject');
propertySchema.set('toJSON');
module.exports = mongoose.model('property', propertySchema);