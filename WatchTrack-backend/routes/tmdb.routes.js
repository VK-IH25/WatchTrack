const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.API_KEY;

//*****MOVIES
// genre list
router.get("/movie/genre", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching:", error.message);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

// Fetch popular movies
router.get("/movies/popular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Fetch top-rated movies
router.get("/movies/toprated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
});

// Fetch trending movies
router.get("/movies/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch now-playing movies
router.get("/tv/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch movie by ID
router.get("/movies/:id", async (req, res) => {
  const movie_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&with_cast=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching movie with ID ${movie_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Fetch movie CAST by ID
router.get("/movies/:id/credits", async (req, res) => {
  const movie_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&with_cast=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching movie with ID ${movie_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Fetch movie RECOMMENDATIONS by ID
router.get("/movies/:id/recommendations", async (req, res) => {
  const movie_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&with_cast=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching movie with ID ${movie_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});



// Search movies by keyword
router.get("/movies/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(
      `Error searching for movies with keyword ${keyword}:`,
      error.message
    );
    res.status(500).json({ error: "Failed to search for movies" });
  }
});

//*****TV

// genre list
router.get("/tv/genre", async (req, res) => {
  try {
    const response = await axios.get(
      `hhttps://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching:", error.message);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

// Fetch popular shows
router.get("/tv/popular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching popular shows:", error.message);
    res.status(500).json({ error: "Failed to fetch popular shows" });
  }
});

// Fetch top-rated shows
router.get("/tv/toprated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch trending shows
router.get("/tv/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch Show by ID
router.get("/tv/:id", async (req, res) => {
  const show_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${show_id}?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching show with ID ${show_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch show details" });
  }
});

// Fetch tv CAST by ID
router.get("/tv/:id/credits", async (req, res) => {
  const show_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${show_id}/credits?api_key=${API_KEY}&with_cast=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching tv with ID ${show_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch tv details" });
  }
});

// Fetch tv show RECOMMENDATIONS by ID
router.get("/tv/:id/recommendations", async (req, res) => {
  const show_id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${show_id}/recommendations?api_key=${API_KEY}&with_cast=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching tv show with ID ${show_id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch tv show details" });
  }
});

// Fetch Seasons by Show
router.get("/tv/:id/season/:season", async (req, res) => {
  const show_id = req.params.id;
  const season = req.params.season;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${show_id}/season/${season}?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      `Error fetching season ${season} of show with ID ${show_id}:`,
      error.message
    );
    res.status(500).json({ error: "Failed to fetch season details" });
  }
});

// Search shows by keyword
router.get("/tv/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${keyword}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(
      `Error searching for shows with keyword ${keyword}:`,
      error.message
    );
    res.status(500).json({ error: "Failed to search for shows" });
  }
});



module.exports = router;
