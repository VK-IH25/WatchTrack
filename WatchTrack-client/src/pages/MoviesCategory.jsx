import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Grid,
  Card,
  Image,
  Loader,
  Pagination,
  Center,
} from "@mantine/core";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

function MoviesCategory() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (category) {
      setLoading(true);
      axios
        .get(`${backendBaseUrl}/tmdb/movies/category/${category}?page=${page}`)
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
          setLoading(false);
        });
    }
  }, [category, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!category) {
    return <Text>Please select a category</Text>;
  }

  return (
    <Container size="xl" style={{ padding: "50px 0" }}>
      <Text size="xl" fw={500} mb="md">
        {category.charAt(0).toUpperCase() + category.slice(1)} Movies
      </Text>

      {loading ? (
        <Loader size="xl" variant="dots" my="xl" />
      ) : (
        <>
          <Grid gutter="xl">
            {movies.map((movie) => (
              <Grid.Col
                key={movie.id}
                span={{ base: 12, xs: 6, sm: 4, md: 3, lg: 3 }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="md" padding="lg" withBorder>
                    <Card.Section>
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                          style={{ height: "430px" }}
                        />
                      ) : (
                        <div
                          style={{
                            height: 430,
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text c="dimmed">No image available</Text>
                        </div>
                      )}
                    </Card.Section>
                    <Text fw={500} mt="md" lineClamp={1}>
                      {movie.title}
                    </Text>
                    <Text c="dimmed" size="sm" mt={4}>
                      {new Date(movie.release_date).getFullYear() ||
                        "Unknown year"}
                    </Text>
                  </Card>
                </Link>
              </Grid.Col>
            ))}
          </Grid>

          <Center mt="xl">
            {movies.length > 0 && (
              <Pagination
                value={page}
                onChange={handlePageChange}
                total={totalPages}
                mt="xl"
                mb="xl"
                siblings={2}
                boundaries={1}
                color="var(--secondary-color)"
                withEdges
                disabled={loading}
                position="center"
              />
            )}
          </Center>
        </>
      )}
    </Container>
  );
}

export default MoviesCategory;
