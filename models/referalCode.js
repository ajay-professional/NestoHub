const mongoose = require('mongoose');

const { Schema } = mongoose;

const referalCodeSchema = new Schema({
    referalCode:  { type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

referalCodeSchema.set('toObject');
referalCodeSchema.set('toJSON');
module.exports = mongoose.model('referalCode', referalCodeSchema);