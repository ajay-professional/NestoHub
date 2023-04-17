const mongoose = require('mongoose');

const { Schema } = mongoose;

const specificationSchema = new Schema({
    name:{type: String, default: null},
    length:{type: String, default: null},
    breadth:{type: String, default: null}
}, {
    timestamps: true,
});

specificationSchema.set('toObject');
specificationSchema.set('toJSON');
module.exports = mongoose.model('specification', specificationSchema);