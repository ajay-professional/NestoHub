const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
     name:{ type: String, default: null },
     isRecommended:{ type: Boolean, default: false },
     colour:{ type: String, default: null },
     numberOfVisit:{ type: Number, default: null },
     planValidityInDays:{ type: Number, default: null },
     description:{ type: String, default: null },
     numberOfproperty:{ type: Number, default: null },
     costPerMonth:{ type: Number, default: null },
     minimumSpend:{ type: String, default: null },
     isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


subscriptionSchema.set('toObject');
subscriptionSchema.set('toJSON');
module.exports = mongoose.model('subscription', subscriptionSchema);



  