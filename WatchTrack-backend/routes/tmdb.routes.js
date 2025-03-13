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
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching:", error.message);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

// Fetch popular movies
router.get("/movies/category/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Fetch top-rated movies
router.get("/movies/category/toprated", async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
});

// Fetch trending movies
router.get("/movies/category/trending", async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch now-playing movies
router.get("/movies/category/nowplaying", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch movie by ID
router.get("/movies/:id(\\d+)", async (req, res) => {
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
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
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
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching:", error.message);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

// Fetch popular shows
router.get("/tv/category/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching popular shows:", error.message);
    res.status(500).json({ error: "Failed to fetch popular shows" });
  }
});

// Fetch top-rated shows
router.get("/tv/category/toprated", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch trending shows
router.get("/tv/category/trending", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error("Error fetching top-rated shows:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated shows" });
  }
});

// Fetch Show by ID
router.get("/tv/:id(\\d+)", async (req, res) => {
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
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${keyword}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error(
      `Error searching for shows with keyword ${keyword}:`,
      error.message
    );
    res.status(500).json({ error: "Failed to search for shows" });
  }
});

// Fetch movies by genre
router.get("/movie/genre/:genreId", async (req, res) => {
  const { genreId } = req.params;
  const { page = 1 } = req.query;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreId}`
    );

    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error.message);
    res.status(500).json({ error: "Failed to fetch movies for the genre" });
  }
});

// Fetch TV shows by genre
router.get("/tv/genre/:genreId", async (req, res) => {
  const { genreId } = req.params;
  const { page = 1 } = req.query;
  try {
    // const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=37';
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages,
    });
  } catch (error) {
    console.error(
      `Error fetching TV shows for genre ${genreId}:`,
      error.message
    );
    res.status(500).json({ error: "Failed to fetch TV shows for the genre" });
  }
});

module.exports = router;
