const mongoose = require('mongoose');

const { Schema } = mongoose;

const reportAbuseSchema = new Schema({
    reason: { type: String, default: null },
    comments:  { type: String, default: null },
    communitySupportAnswersId: { type: Schema.ObjectId, ref: 'communitySupportAnswers', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

reportAbuseSchema.set('toObject');
reportAbuseSchema.set('toJSON');
module.exports = mongoose.model('reportAbuse', reportAbuseSchema);