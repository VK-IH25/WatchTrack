import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Loader, Group } from "@mantine/core";
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
    trending: `${backendBaseUrl}/tmdb/movies/category/trending/?page=1`,
    popular: `${backendBaseUrl}/tmdb/movies/category/popular/?page=1`,
    toprated: `${backendBaseUrl}/tmdb/movies/category/toprated/?page=1`,
    nowplaying: `${backendBaseUrl}/tmdb/movies/category/nowplaying/?page=1`,
  };

  const categoryLinks = {
    trending: "/movies/category/trending",
    popular: "/movies/category/popular",
    toprated: "/movies/category/toprated",
    nowplaying: "/movies/category/nowplaying",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiEndpoints[category]);
        setMovies(response.data.results || []);
        console.log(apiEndpoints[category]);
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
      <Link to={categoryLinks[category]} style={{ textDecoration: "none" }}>
        <Group spacing="xs">
          <Text size="xl" mb="sm" weight={700} color="blue">
            {category.charAt(0).toUpperCase() + category.slice(1)} Movies
          </Text>
        </Group>
      </Link>
      {movies.length > 0 && (
        <Carousel
          key={category}
          type="container"
          slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
          slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
          loop
          align="start"
        >
          {movies.map((movie) => (
            <Carousel.Slide key={movie.id}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  <Link to={`/movie/${movie.id}`}>
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title || "No Image"}
                        style={{ minHeight: "370px" }}
                        fit="cover"
                      />
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "370px",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </Link>
                </Card.Section>
                <Text align="center" mt="sm" lineClamp={1}>
                  <Link
                    to={`/movie/${movie.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    {movie.title || "Unknown Title"}
                  </Link>
                </Text>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MoviesCarousel;
