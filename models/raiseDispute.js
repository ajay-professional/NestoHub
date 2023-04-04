const mongoose = require('mongoose');

const { Schema } = mongoose;

const raiseDisputeSchema = new Schema({
    reason: { type: String, default: null },
    comments:  { type: String, default: null },
    visitId: { type: Schema.ObjectId, ref: 'visit', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

raiseDisputeSchema.set('toObject');
raiseDisputeSchema.set('toJSON');
module.exports = mongoose.model('raiseDispute', raiseDisputeSchema);
