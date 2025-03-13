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
  TextInput,
  Button,
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return;

      setLoading(true);
      try {
        const url = searchQuery
          ? `${backendBaseUrl}/tmdb/movies/search/${searchQuery}?page=${page}`
          : `${backendBaseUrl}/tmdb/movies/category/${category}`;

        const { data } = await axios.get(url, { params: { page } });
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page, searchQuery]);

  const handleSearch = () => setPage(1);

  if (!category) return <Text>Please select a category</Text>;

  return (
    <Container size="xl" style={{ padding: "50px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text size="xl" fw={500}>
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : `${category.replace(/_/g, " ").toUpperCase()} MOVIES`}
        </Text>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextInput
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ width: 250 }}
          />
          <Button onClick={handleSearch} variant="light" color="blue">
            🔍 Search
          </Button>
        </div>
      </div>

      {loading ? (
        <Loader size="xl" variant="dots" my="xl" />
      ) : (
        <>
          <Grid gutter="xl">
            {movies.map((movie) => (
              <Grid.Col key={movie.id} span={{ base: 12, xs: 6, sm: 4, md: 3 }}>
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
                    <Text fw={500} mt="md" lineClamp={2}>
                      {movie.title}
                    </Text>
                    <Text c="dimmed" size="sm" mt={4}>
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "Unknown year"}
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
                onChange={setPage}
                total={totalPages}
                color="var(--secondary-color)"
                siblings={2}
                boundaries={1}
                withEdges
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
