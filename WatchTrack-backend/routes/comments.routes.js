const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Create a comment
router.post("/comments", isAuthenticated, async (req, res) => {
  try {
    const { movieId, tvShowId, text } = req.body;
    const userId = req.payload._id;

    if (!text)
      return res.status(400).json({ message: "Comment text is required." });
    if (!movieId && !tvShowId)
      return res
        .status(400)
        .json({ message: "movieId or tvShowId is required." });

    const comment = await Comment.create({
      user: userId,
      movieId,
      tvShowId,
      text,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get comments for a movie/TV show
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Edit comment
router.put("/comments/:id", isAuthenticated, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.payload._id;

    if (!text)
      return res.status(400).json({ message: "Updated text is required." });

    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });

    if (comment.user.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this comment." });

    comment.text = text;
    await comment.save();
    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete comment
router.delete("/comments/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;

    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });

    if (comment.user.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment." });

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
