const mongoose = require('mongoose');

const { Schema } = mongoose;

const builderSchema = new Schema({
    phoneNumber: { type: String, default: null },
    otp:  { type: String, default: null },
    name: { type: String, default: null },
    subBuilderType: { type: String, default: null },
    selectProperties:[{ type: Schema.ObjectId, ref: 'property', default: null }],
    referalCode:  { type: String, default: null },
    parentId: { type: Schema.ObjectId, ref: "builder", default: null },
    email: { type: String, default: null },
    typeOfProperty: { type: String, default: null },
    locationOfProperty: { type: String, default: null },
    projectName:{ type: String, default: null },
    description:{ type: String, default: null },
    companyName:{ type: String, default: null },
    address: { type: String, default: null },
    companyType: { type: String, default: null},
    gst: { type: String, default: null },
    logoUrl:{ type: String, default: null },
    panOfCompany: { type: String, default: null },
    profilePictureUrl:{ type: String, default: null },
    documents:  [{ type: String, default: null }],
    termAndCondition:{ type: String, default: null },
    rating: { type: Number, default: 3 },
    // nextro app provided term&cond. data not  in builder
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
builderSchema.set('toObject');
builderSchema.set('toJSON');
module.exports = mongoose.model('builder', builderSchema);
