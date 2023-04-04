const mongoose = require('mongoose');

const { Schema } = mongoose;

const communitySupportQuestionsSchema = new Schema({
    question:  { type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


communitySupportQuestionsSchema.set('toObject');
communitySupportQuestionsSchema.set('toJSON');
module.exports = mongoose.model('communitySupportQuestions', communitySupportQuestionsSchema);