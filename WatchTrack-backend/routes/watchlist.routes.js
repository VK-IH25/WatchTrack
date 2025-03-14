const express = require("express");
const Watchlist = require("../models/Watchlist.model");
const { isAuthenticated, isOwner } = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/watchlist", (req, res, next) => {
    Watchlist.find()
        .then((watchlists) => {
            res.json(watchlists);
        })
        .catch((err) => next(err));
});

router.post("/watchlist", (req, res, next) => {
    const { title, description, createdBy, image, isPrivate } = req.body;
    Watchlist.create({ title, description, createdBy, image, isPrivate })
        .then((watchlist) => {
            res.status(201).json(watchlist);
        })
        .catch((err) => next(err));
});

router.get("/watchlist/:id", (req, res, next) => {
    const { id } = req.params;
    Watchlist.findById(id)
        .then((watchlist) => {
            if (!watchlist) {
                res.status(404).json(watchlist);
            } else {
                res.json(watchlist);
            }
        })
        .catch((err) => next(err));
}
);

router.put("/watchlist/:id", isAuthenticated, isOwner, (req, res, next) => {
    const { id } = req.params;
    const { title, description, createdBy, isPrivate, movies, tvShows } = req.body;
    Watchlist.findByIdAndUpdate(
        id,
        { title, description, createdBy, isPrivate, movies, tvShows },
        { new: true } // Return the updated document
    )
        .then((watchlist) => {
            if (!watchlist) {
                res.status(404).json({ error: "Watchlist not found" });
            } else {
                res.json(watchlist);
            }
        })
        .catch((err) => next(err));
}
);

router.delete("/watchlist/:id", isAuthenticated, isOwner, (req, res, next) => {
    const { id } = req.params;
    Watchlist.findByIdAndDelete(id)
        .then((watchlist) => {
            if (!watchlist) {
                res.status(404).json(watchlist);
            } else {
                res.json(watchlist);
            }
        })
        .catch((err) => next(err));
});

module.exports = router;
