const mongoose = require('mongoose');

const { Schema } = mongoose;

const promotionBannerSchema = new Schema({
    propertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

promotionBannerSchema.set('toObject');
promotionBannerSchema.set('toJSON');
module.exports = mongoose.model('promotionBanner', promotionBannerSchema);