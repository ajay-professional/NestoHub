

const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationAdvantageSchema = new Schema({
    image:{type: String, default: null},
    name:{type: String, default: null},
    distance:{type: String, default: null}
}, {
    timestamps: true,
});

locationAdvantageSchema.set('toObject');
locationAdvantageSchema.set('toJSON');
module.exports = mongoose.model('locationAdvantage', locationAdvantageSchema);