import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text } from "@mantine/core";
import "@mantine/carousel/styles.css";

const CategoryCarousel = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  // Fetch popular movies
  // Fetch top-rated movies
  // Fetch trending movies
  // Fetch now-playing movies
  let apiUrl = "";
  switch (category) {
    case "Trending Now":
      apiUrl = `${backendBaseUrl}/tmdb/tv/trending`;
      break;
    case "New Releases":
      apiUrl = `${backendBaseUrl}/tmdb/movies/now_playing`;
      break;
    case "Popular Movies":
      apiUrl = `${backendBaseUrl}/tmdb/movies/popular`;
      break;
    default:
      apiUrl = `${backendBaseUrl}/tmdb/movies/popular`;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setMovies(data.results || data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiUrl]);

  return (
    <div style={{ marginTop: "30px" }}>
      <Text size="xl" weight={700} mb="sm">
        {title}
      </Text>

      <Carousel
        height={320}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {movies.map((movie, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="sm" padding="lg">
              <Card.Section>
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    height={270}
                    fit="cover"
                    alt={movie.title || "Movie Image"}
                  />
                ) : (
                  <div
                    style={{
                      height: 270,
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
