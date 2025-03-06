import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";
import "@mantine/carousel/styles.css";

const MoviesCarousel = ({ category, activeTab }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  const apiEndpoints = {
    "Trending Movies": `${backendBaseUrl}/tmdb/movies/trending`,
    "Popular Movies": `${backendBaseUrl}/tmdb/movies/popular`,
    "Top Rated Movies": `${backendBaseUrl}/tmdb/movies/toprated`,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiEndpoints[category]);
        setMovies(response.data || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
        console.log(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, activeTab]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Text color="red">{error}</Text>
      </div>
    );
  }

  return (
    <div style={{ margin: "50px 0px" }}>
      <Text size="xl" weight={700} mb="sm">
        {category}
      </Text>
      {movies.length > 0 && (
        <Carousel
          key={category}
          height={320}
          type="container"
          slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
          slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
          loop
          align="start"
        >
          {movies.map((movie) => (
            <Carousel.Slide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <Card shadow="sm" padding="lg">
                  <Card.Section>
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        height={270}
                        fit="cover"
                        alt={movie.title || "No Image"}
                      />
                    ) : (
                      <div
                        style={{
                          height: 270,
                          backgroundColor: "#ccc",
                          display: "flex",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </Card.Section>
                  <Text align="center" mt="sm" lineClamp={1}>
                    {movie.title || "Unknown Title"}
                  </Text>
                </Card>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MoviesCarousel;
