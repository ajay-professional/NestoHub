const mongoose = require('mongoose');

const { Schema } = mongoose;

const raiseQuerySchema = new Schema({
    subject:  { type: String, default: null },
    description: { type: String, default: null },
    createdById:{ type: String, default: null },
    type:{ type: String, default: null },
}, {
    timestamps: true,
});

raiseQuerySchema.set('toObject');
raiseQuerySchema.set('toJSON');
module.exports = mongoose.model('raiseQuery', raiseQuerySchema);
