const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        uppercase: true,
        minlength: [7, "TOO SHORT"],
        maxlength: [14, "TOO LONG"],
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
