const mongoose = require('mongoose');

const { Schema } = mongoose;

const nearByAreaSchema = new Schema({
    image:{type: String, default: null},
    name:{type: String, default: null},
    location:{type: String, default: null},
    distance:{type: String, default: null}
}, {
    timestamps: true,
});

nearByAreaSchema.set('toObject');
nearByAreaSchema.set('toJSON');
module.exports = mongoose.model('nearByArea', nearByAreaSchema);