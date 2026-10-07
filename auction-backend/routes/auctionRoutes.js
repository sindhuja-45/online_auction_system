const express = require("express");
const Auction = require("../models/Auction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Auction
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startingBid,
      image,
      endDate
    } = req.body;

    const seller = req.user.id;

    if (
      !title ||
      !description ||
      !category ||
      !startingBid ||
      !seller ||
      !endDate
    ) {
      return res.status(400).json({
        message: "All required fields are needed"
      });
    }

    if (new Date(endDate) <= new Date()) {
      return res.status(400).json({
        message: "Auction end date must be in the future"
       });
    }

    if (Number(startingBid) <= 0) {
       return res.status(400).json({
        message: "Starting bid must be greater than 0"
      });
    }

    const auction = new Auction({
      title,
      description,
      category,
      startingBid,
      currentBid: startingBid,
      image,
      seller,
      endDate
    });

    await auction.save();

    res.status(201).json({
      message: "Auction created successfully",
      auction
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Get All Auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json(auctions);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Get One Auction
router.get("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("seller", "name email");

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found"
      });
    }

    res.json(auction);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});
module.exports = router;
