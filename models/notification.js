const mongoose = require('mongoose');

const { Schema } = mongoose;

const notificationSchema = new Schema({
    title:  { type: String, default: null },
    description:  { type: String, default: null },
    sendTo:{ type: String, default: null },
    sendFrom:{ type: String, default: null },
    builderId:{ type: Schema.ObjectId, ref: 'builder', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

notificationSchema.set('toObject');
notificationSchema.set('toJSON');
module.exports = mongoose.model('notification', notificationSchema);