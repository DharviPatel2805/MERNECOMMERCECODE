const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          trim: true,
          maxlength: 30,
          text: true,
        },
        set: {
          type: Boolean,
          default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Content", contentSchema);
