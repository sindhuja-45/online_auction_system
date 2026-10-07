const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    startingBid: {
      type: Number,
      required: true
    },

    currentBid: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    endDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Auction", auctionSchema);