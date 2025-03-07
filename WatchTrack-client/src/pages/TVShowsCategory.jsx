import { useEffect, useState } from "react";
import { Container, Text, Grid, Card, Image, Box, Loader } from "@mantine/core";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

function TVShowsCategory() {
  const { category } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendBaseUrl}/tmdb/tv/category/${category}`)
      .then((response) => {
        if (response.data) {
          setTvShows(response.data);
        } else {
          setTvShows([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV shows:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <Container size="xl" mb="xl" mt="xl" style={{ padding: "50px 0" }}>
      <Text size="xl" weight={700} mb="sm">
        {category.charAt(0).toUpperCase() + category.slice(1)} TV Shows
      </Text>

      {loading ? (
        <Loader size="xl" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid gutter="lg">
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <Grid.Col key={tvShow.id} span={{ base: 12, md: 6, lg: 3 }}>
                <Link
                  to={`/tv/${tvShow.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    style={{ width: "100%" }}
                  >
                    <Card.Section>
                      {tvShow.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                          height={350}
                          fit="cover"
                          alt={tvShow.name}
                        />
                      ) : (
                        <Box
                          style={{
                            height: 350,
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
    </Container>
  );
}

export default TVShowsCategory;
