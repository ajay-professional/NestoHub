const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestPropertySchema = new Schema({
    images: [{ type: String, default: null }],
    name: { type: String, default: null },
    location: { type: String, default: null },
    categoryId: { type: Schema.ObjectId, ref: 'propertyCategoryId', default: null },
    locationAdvantages:[{ 
        name:{ type: String, default: null },
        distance:{ type: String, default: null },
     }],
     paymentPlan: [{ 
        payment:{type: String, default: null},
        milestone:{type: String, default: null},
     }],
    amenities:  [{ type: String, default: null }],
    loanApprovedBy:  [{ type: Schema.ObjectId, ref: 'bank', default: null }],
    brochureUrl:{ type: String, default: null },
    propertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


requestPropertySchema.set('toObject');
requestPropertySchema.set('toJSON');
module.exports = mongoose.model('requestProperty', requestPropertySchema);
