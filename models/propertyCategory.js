const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertyCategorySchema = new Schema({
    name: { type: String, default: null },
    iconUrl:{ type: String, default: null },
    description:{ type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

propertyCategorySchema.set('toObject');
propertyCategorySchema.set('toJSON');
module.exports = mongoose.model('propertyCategory', propertyCategorySchema);