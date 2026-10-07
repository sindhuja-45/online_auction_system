const express = require("express");
const Auction = require("../models/Auction");
const Bid = require("../models/Bid");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Place a Bid
router.post("/place", authMiddleware, async (req, res) => {
  try {
    const {
      auctionId,
      amount
    } = req.body;

    const bidderId = req.user.id;

    if (!auctionId || !bidderId || !amount) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found"
      });
    }

    if (new Date() > new Date(auction.endDate)) {
      return res.status(400).json({
         message: "This auction has ended"
      });
    }

    if (Number(amount) <= auction.currentBid) {
      return res.status(400).json({
        message: "Bid must be higher than current bid"
      });
    }

    const bid = new Bid({
      auction: auctionId,
      bidder: bidderId,
      amount: Number(amount)
    });

    await bid.save();

    auction.currentBid = Number(amount);

    await auction.save();

    res.status(201).json({
      message: "Bid placed successfully",
      bid: bid
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;