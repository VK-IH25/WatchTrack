const { expressjwt: jwt } = require("express-jwt");
const Watchlist = require('../models/Watchlist.model'); // Adjust the path as necessary

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

const isOwner = async (req, res, next) => {
  try {
    const watchlistId = req.params.id;
    const userId = req.payload._id;

    const watchlist = await Watchlist.findById(watchlistId);

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    if (watchlist.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to access this watchlist' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isOwner,
};
