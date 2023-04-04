const mongoose = require("mongoose");

const { Schema } = mongoose;

const boughtSchema = new Schema(
  {
    bookingDate: { type: String, default: null },
    unitNumber: { type: String, default: null },
    unitType: { type: String, default: null },
    customerName: { type: String, default: null },
    builderRepresentativeName: { type: String, default: null },
    sellingPrice: { type: String, default: null },
    brokerageValue: { type: String, default: null },
    documents: [{ type: String, default: null }],
    // sellingDate: { type: String, default: null }, // new fields
    customerId: { type: Schema.ObjectId, ref: "customer", default: null },
    propertyId: { type: Schema.ObjectId, ref: "property", default: null },
    builderId: { type: Schema.ObjectId, ref: "builder", default: null },
    visitId: { type: Schema.ObjectId, ref: "visit", default: null },
    brokerId: { type: Schema.ObjectId, ref: "broker", default: null },
    isDeleted: { type: Boolean, default: false },
    isBrokerageClaimed:{type:Boolean,default:false},
    visitClaimed:{type:Boolean,default:false},
  },
  {
    timestamps: true,
  }
);

boughtSchema.set("toObject");
boughtSchema.set("toJSON");
module.exports = mongoose.model("bought", boughtSchema);
