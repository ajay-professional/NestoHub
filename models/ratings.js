const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingsSchema = new Schema({
    rating:  { type: String, default: null },
    message:  { type: String, default: null },
    customerId:{ type: Schema.ObjectId, ref: 'customer', default: null },
    propertyId:{ type: Schema.ObjectId, ref: 'property', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

ratingsSchema.set('toObject');
ratingsSchema.set('toJSON');
module.exports = mongoose.model('ratings', ratingsSchema);