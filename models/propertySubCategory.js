const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySubCategorySchema = new Schema({
    name: { type: String, default: null },
    description:{ type: String, default: null },
    parentId: { type: Schema.ObjectId, ref: 'propertyCategoryId', default: null },
    isDeleted: { type: Boolean, default: false },

}, {
    timestamps: true,
});


propertySubCategorySchema.set('toObject');
propertySubCategorySchema.set('toJSON');
module.exports = mongoose.model('propertySubCategory', propertySubCategorySchema);