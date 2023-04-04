const mongoose = require('mongoose');

const { Schema } = mongoose;

const tutorialsSchema = new Schema({
    thumbnail:  { type: String, default: null },
    title:  { type: String, default: null },
    description:  { type: String, default: null },
    link: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


tutorialsSchema.set('toObject');
tutorialsSchema.set('toJSON');
module.exports = mongoose.model('tutorials', tutorialsSchema);