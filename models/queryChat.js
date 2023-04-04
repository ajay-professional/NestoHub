const mongoose = require('mongoose');

const { Schema } = mongoose;

const queryChatSchema = new Schema({
    query:  { type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

queryChatSchema.set('toObject');
queryChatSchema.set('toJSON');
module.exports = mongoose.model('queryChat', queryChatSchema);