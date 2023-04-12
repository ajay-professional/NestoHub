const mongoose = require('mongoose');

const { Schema } = mongoose;

const amenitiesSchema = new Schema({
    image:{type: String, default: null},
    name:{type: String, default: null},
    quantity:{type: String, default: null},
}, {
    timestamps: true,
});

amenitiesSchema.set('toObject');
amenitiesSchema.set('toJSON');
module.exports = mongoose.model('amenities', amenitiesSchema);