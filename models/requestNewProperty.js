const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestNewPropertySchema = new Schema({
    
    name: { type: String, default: null },
    email:{ type: String, default: null },
    phoneNumber:{ type: String, default: null },
    typeOfProperty:[{ type: String, default: null }],
    locationProperty:[{ type: String, default: null }],
    projectName:{ type: String, default: null },
    description:{ type: String, default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


requestNewPropertySchema.set('toObject');
requestNewPropertySchema.set('toJSON');
module.exports = mongoose.model('requestNewProperty', requestNewPropertySchema);
