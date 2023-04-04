const mongoose = require('mongoose');

const { Schema } = mongoose;

const requirementSchema = new Schema({
    unitType: [{ type: String, default: null }],
    preferredLocation:[{ type: String, default: null }],
    minPrice: { type: String, default: null },
    maxPrice: { type: String, default: null },
    customerId: { type: Schema.ObjectId, ref: 'customer', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


requirementSchema.set('toObject');
requirementSchema.set('toJSON');
module.exports = mongoose.model('requirement', requirementSchema);