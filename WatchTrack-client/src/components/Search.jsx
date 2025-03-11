import { useState } from "react";
import axios from "axios";
import { TextInput, Button, Container } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

const Search = () => {
  const [query, setQuery] = useState("");
  const [moviesResult, setMoviesResult] = useState([]);
  const [tvResult, setTvResult] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    handleSearchMovie(e);
    handleSearchTv(e);
  };

  const handleSearchMovie = (e) => {
    e.preventDefault();
    axios
      .get(`${backendBaseUrl}/tmdb/movies/search/${query}`)
      .then((response) => {
        if (response.data) {
          setMoviesResult(response.data);
        } else {
          setMoviesResult([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchTv = (e) => {
    e.preventDefault();
    axios
      .get(`${backendBaseUrl}/tmdb/tv/search/${query}`)
      .then((response) => {
        if (response.data) {
          setTvResult(response.data);
        } else {
          setTvResult([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container size="xl" style={{ padding: "50px 0" }}>
      <form onSubmit={handleSearch}>
        <TextInput
          placeholder="Search for category, movie or Tv Show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <Button type="submit" mt="md" mb={20}>
          Search
        </Button>
      </form>

      {moviesResult.length > 0 && (
        <>
          <Text size="xl" weight={700} mb="sm">
            Results matching "{query}"
          </Text>
          <Text size="xl" weight={700} mb="sm">
            Movies
          </Text>
          <Carousel
            mt={20}
            type="container"
            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
            loop
            align="start"
          >
            {moviesResult.map((movie, index) => (
              <Carousel.Slide key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          fit="cover"
                          alt={movie.title}
                          style={{ minHeight: "370px" }}
                        />
                      ) : (
                        <div
                          style={{
                            minHeight: "370px",
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
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}

      {tvResult.length > 0 && (
        <>
          <Text size="xl" weight={700} mb="sm" mt="lg">
            TV Shows
          </Text>
          <Carousel
            mt={20}
            type="container"
            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
            loop
            align="start"
          >
            {tvResult.map((movie, index) => (
              <Carousel.Slide key={index}>
                <Link to={`/tv/${movie.id}`}>
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          fit="cover"
                          alt={movie.title}
                          style={{ minHeight: "370px" }}
                        />
                      ) : (
                        <div
                          style={{
                            minHeight: "370px",
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
                      {movie.name}
                    </Text>
                  </Card>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
};

export default Search;
