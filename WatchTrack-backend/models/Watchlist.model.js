const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const watchlistSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: uuidv4
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    movies: {
        type: [String],
        default: []
    },
    tvShows: {
        type: [String],
        default: []
    }
});

const Watchlist = model("Watchlist", watchlistSchema);

module.exports = Watchlist