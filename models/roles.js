const mongoose = require('mongoose');

const { Schema } = mongoose;

const rolesSchema = new Schema({
    add: { type: String, default: null },
    name:  { type: String, default: null },
    email: { type: String, default: null },
    mobileNumber: { type: String, default: null },
    selectProperties:[{ type: Schema.ObjectId, ref: 'property', default: null }],
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

rolesSchema.set('toObject');
rolesSchema.set('toJSON');
module.exports = mongoose.model('roles', rolesSchema);