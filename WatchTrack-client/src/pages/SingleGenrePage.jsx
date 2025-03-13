import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
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

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

const SingleGenrePage = () => {
  const { type, genreId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenreItems = async () => {
      setLoading(true);
      try {
        const url = `${backendBaseUrl}/tmdb/${type}/genre/${genreId}?page=${page}`;
        const { data } = await axios.get(url);
        setItems(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreItems();
  }, [type, genreId, page]);

  if (loading) return <Loader size="xl" variant="dots" my="xl" />;
  if (error)
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

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
          Browse {type === "movie" ? "Movies" : "TV Shows"} by Genre
        </Text>
      </div>

      <Grid gutter="xl">
        {items.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, xs: 6, sm: 4, md: 3 }}>
            <Link
              to={`/${type === "movie" ? "movie" : "tv"}/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card shadow="md" padding="lg" withBorder>
                <Card.Section>
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title || item.name}
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
                  {item.title || item.name}
                </Text>
                <Text c="dimmed" size="sm" mt={4}>
                  {console.log(item)}
                  {item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : new Date(item.first_air_date).getFullYear()}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>

      <Center mt="xl">
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
      </Center>
    </Container>
  );
};

export default SingleGenrePage;
