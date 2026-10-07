const express = require("express");
const User = require("../models/User");
const Auction = require("../models/Auction");
const Bid = require("../models/Bid");

const router = express.Router();

// Get User Profile
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const auctions = await Auction.find({
      seller: req.params.userId
    }).sort({ createdAt: -1 });

    const bids = await Bid.find({
      bidder: req.params.userId
    })
      .populate("auction", "title currentBid")
      .sort({ createdAt: -1 });

    res.json({
      user,
      auctions,
      bids
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;