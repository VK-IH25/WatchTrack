import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text } from "@mantine/core";
import "@mantine/carousel/styles.css";

const CategoryCarousel = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    console.error("API key is missing in .env file");
    return null;
  }

  let apiUrl = "";

  switch (category) {
    case "Trending Now":
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;
      break;
    case "New Releases":
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&page=1`;
      break;
    case "Popular Movies":
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
      break;
    default:
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [category]);

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
                    alt={movie.title}
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
                {movie.title}
              </Text>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
