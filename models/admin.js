const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    username: { type: String, default: null },
    password: { type: String, default: null },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});

adminSchema.set('toObject');
adminSchema.set('toJSON');
module.exports = mongoose.model('admin', adminSchema);
