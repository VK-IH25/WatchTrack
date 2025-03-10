const mongoose = require("mongoose");
const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Create a comment on a movie / TV show
router.post("/comments", isAuthenticated, async (req, res) => {
  try {
    const { movieId, tvShowId, text } = req.body;

    if (!text)
      return res.status(400).json({ message: "Comment text is required." });
    if (!movieId && !tvShowId)
      return res
        .status(400)
        .json({ message: "movieId or tvShowId is required." });

    const userId = req.payload._id;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated." });
    }

    // Create comment
    const comment = new Comment({
      user: userId,
      movieId: movieId,
      tvShowId: tvShowId,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all comments
router.get("/comments", async (req, res) => {
  try {
    const { movieId, tvShowId } = req.query;

    if (!movieId && !tvShowId)
      return res
        .status(400)
        .json({ message: "movieId or tvShowId is required." });

    const comments = await Comment.find({
      $or: [{ movieId }, { tvShowId }],
    }).populate("user", "username email");

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a comment
router.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
