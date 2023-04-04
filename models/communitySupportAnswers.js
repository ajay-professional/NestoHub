const mongoose = require('mongoose');

const { Schema } = mongoose;

const communitySupportAnswersSchema = new Schema({
    answer:  { type: String, default: null },
    communitySupportQuestionsId: { type: Schema.ObjectId, ref: 'communitySupportQuestions', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

communitySupportAnswersSchema.set('toObject');
communitySupportAnswersSchema.set('toJSON');
module.exports = mongoose.model('communitySupportAnswers', communitySupportAnswersSchema);