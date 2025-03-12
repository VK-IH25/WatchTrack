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
} from "@mantine/core";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

function TVShowsCategory() {
  const { category } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendBaseUrl}/tmdb/tv/category/${category}?page=${page}`)
      .then((response) => {
        if (response.data.results) {
          setTvShows(response.data.results);
          setTotalPages(response.data.total_pages);
        } else {
          setTvShows([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV shows:", err);
        setLoading(false);
      });
  }, [category, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container size="xl" mb="xl" style={{ padding: "50px 0" }}>
      <Text size="xl" weight={700} mb="sm">
        {category.charAt(0).toUpperCase() + category.slice(1)} TV Shows
      </Text>

      {loading ? (
        <Loader size="xl" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid gutter="lg">
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <Grid.Col
                key={tvShow.id}
                span={{ base: 12, xs: 6, sm: 4, md: 3, lg: 3 }}
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
                    <Text align="center" mt="sm" lineClamp={1}>
                      {tvShow.name}
                    </Text>
                  </Card>
                </Link>
              </Grid.Col>
            ))
          ) : (
            <Text align="center">No TV shows found in this category.</Text>
          )}
        </Grid>
      )}
      <Center mt="xl">
        {tvShows.length > 0 && (
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={totalPages}
            mt="xl"
            mb="xl"
            siblings={2}
            color="var(--secondary-color)"
            boundaries={1}
            withEdges
            disabled={loading}
            position="center"
          />
        )}
      </Center>
    </Container>
  );
}

export default TVShowsCategory;
