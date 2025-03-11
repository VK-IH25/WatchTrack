import { useEffect, useState } from "react";
import { Container, Text, Grid, Card, Image, Loader } from "@mantine/core";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

function MoviesCategory() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setLoading(true);
      axios
        .get(`${backendBaseUrl}/tmdb/movies/category/${category}`)
        .then((response) => {
          setMovies(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
          setLoading(false);
        });
    }
  }, [category]);

  if (!category) {
    return <Text>Please select a category</Text>;
  }

  return (
    <Container size="xl" mb="xl" style={{ padding: "50px 0" }}>
      <Text size="xl" weight={700} mb="sm">
        {category.charAt(0).toUpperCase() + category.slice(1)} Movies
      </Text>
      {loading ? (
        <Loader size="xl" />
      ) : (
        <>
          <Grid gutter="md">
            {movies.map((movie) => (
              <Grid.Col key={movie.id} span={{ base: 12, md: 6, lg: 3 }}>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          fit="contain"
                          alt={movie.title}
                        />
                      ) : (
                        <div
                          style={{
                            height: 300,
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
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default MoviesCategory;
