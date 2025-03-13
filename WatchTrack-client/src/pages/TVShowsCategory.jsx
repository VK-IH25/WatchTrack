import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Grid,
  Card,
  Image,
  Box,
  Loader,
  Center,
  Pagination,
  TextInput,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

function TVShowsCategory() {
  const { category } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchTVShows = async () => {
      if (!category) return;

      setLoading(true);
      try {
        const url = searchQuery
          ? `${backendBaseUrl}/tmdb/tv/search/${searchQuery}?page=${page}`
          : `${backendBaseUrl}/tmdb/tv/category/${category}`;

        const { data } = await axios.get(url, { params: { page } });
        setTvShows(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Error fetching TV shows:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [category, page, searchQuery]);

  const handleSearch = () => setPage(1);

  if (!category) return <Text>Please select a category</Text>;

  return (
    <Container size="xl" mb="xl" style={{ padding: "50px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text size="xl" weight={700}>
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : `${category.replace(/_/g, " ").toUpperCase()} TV SHOWS`}
        </Text>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextInput
            placeholder="Search TV shows..."
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
        <Loader size="xl" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid gutter="lg">
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <Grid.Col
                key={tvShow.id}
                span={{ base: 12, xs: 6, sm: 4, md: 3 }}
              >
                <Link
                  to={`/tv/${tvShow.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      {tvShow.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                          alt={tvShow.name}
                          style={{ height: "430px" }}
                        />
                      ) : (
                        <Box
                          style={{
                            height: 430,
                            backgroundColor: "#ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          No Image
                        </Box>
                      )}
                    </Card.Section>
                    <Text align="center" mt="sm" lineClamp={2}>
                      {tvShow.name}
                    </Text>
                  </Card>
                </Link>
              </Grid.Col>
            ))
          ) : (
            <Text align="center">No TV shows found.</Text>
          )}
        </Grid>
      )}

      <Center mt="xl">
        {tvShows.length > 0 && (
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
    </Container>
  );
}

export default TVShowsCategory;
