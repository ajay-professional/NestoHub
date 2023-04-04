const mongoose = require('mongoose');

const { Schema } = mongoose;

const bankSchema = new Schema({
    name: { type: String, default: null },
    image:{ type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


bankSchema.set('toObject');
bankSchema.set('toJSON');
module.exports = mongoose.model('bank', bankSchema);