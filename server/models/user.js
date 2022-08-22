const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{
        type: ObjectId,
        ref: "Product",
    }],
    credit: {
      type: Number,
      default: 5,
    },
    refNumber: {
      type: Number,
      default: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);