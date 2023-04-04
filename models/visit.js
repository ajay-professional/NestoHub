const mongoose = require('mongoose');

const { Schema } = mongoose;

const visitSchema = new Schema({
    propertyName: { type: String, default: null },
    requirement: { type: String, default: null },
    date: { type: String, default: null },
    commentHistory:[{
        date: { type: String, default: null },
        comment: { type: String, default: null },
    }],
    followUpDate: { type: String, default: null },
    followUpTime: { type: String, default: null },
    date: { type: String, default: null },
    chooseSlot: { type: String, default: null },
    visitStatus: { type: String, default: 'pending' },
    otp: { type: String, default: null },
    minPrice: { type: String, default: null },
    maxPrice: { type: String, default: null },
    unitType: [{ type: String, default: null }],
    preferredLocation: [{ type: String, default: null }],
    isPromoted:{ type: Boolean, default: false },
    isOtpVerified:{ type: Boolean, default: false },
    clientName: { type: String, default: null },
    propertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    customerId: { type: Schema.ObjectId, ref: 'customer', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    overAllRating:{ type: String, default: null }, // extra fields
    builderBehavior:{ type: String, default: null }, 
    builderPunctuality:{ type: String, default: null }, 
    builderCleanliness:{ type: String, default: null }, 
    rateTheSatisfaction:{ type: String, default: null },
    writeReview:{ type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

visitSchema.set('toObject');
visitSchema.set('toJSON');
module.exports = mongoose.model('visit', visitSchema);




