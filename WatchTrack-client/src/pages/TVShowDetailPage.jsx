import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Text,
  Loader,
  SimpleGrid,
  Group,
  Container,
  Button,
  Overlay,
  Stack,
  Box,
  Image,
  Divider,
} from "@mantine/core";
import axios from "axios";
import { Carousel } from "@mantine/carousel";

const TVShowDetailPage = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const tvShowResponse = await axios.get(
          `${backendBaseUrl}/tmdb/tv/${id}`
        );
        console.log(tvShowResponse);
        setTvShow(tvShowResponse.data);

        const castResponse = await axios.get(
          `${backendBaseUrl}/tmdb/tv/${id}/credits`
        );

        setCast(castResponse.data.cast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (loading) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (!tvShow) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Text size="xl" weight={700}>
          No TV show found
        </Text>
      </Container>
    );
  }

  return (
    <Container
      size="xxl"
      style={{ padding: "50px", marginTop: "50px", position: "relative" }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "65svh",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvShow.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />
      <Overlay
        color="#000"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "65svh",
        }}
        opacity={0.6}
        zIndex={1}
      />

      <Button
        variant="light"
        color="rgba(255, 255, 255, 1)"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 3,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        ← Back
      </Button>

      <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
        style={{ position: "relative", zIndex: 2, paddingTop: 60 }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
          alt={tvShow.name}
          radius="lg"
          style={{ maxWidth: "300px", margin: "auto" }}
        />

        <Stack spacing="sm">
          <Text size="35px" color="white" weight={900} lineClamp={1}>
            {tvShow.name}
          </Text>
          <Text size="lg" color="white">
            {tvShow.tagline || "No tagline available"}
          </Text>
          <Group spacing="xl" mt="md">
            <Text color="white">{tvShow.first_air_date}</Text>
            <Text color="white">•</Text>
            <Text color="white">{tvShow.number_of_seasons} seasons</Text>
            <Text color="white">•</Text>
            <Text color="white">
              {tvShow.genres.map((g) => g.name).join(", ")}
            </Text>
          </Group>
          <Divider my="xl" />
          <Group mt="xl">
            <Button radius="xl" size="md" variant="light">
              + Add to Watchlist
            </Button>
            <Button radius="xl" size="md">
              ▶ Watch Now
            </Button>
            <Button variant="subtle" size="md">
              Already seen it?
            </Button>
          </Group>
          <Text my="xl" color="white" size="md">
            {tvShow.overview}
          </Text>
        </Stack>
      </SimpleGrid>

      <Container
        size="xxl"
        style={{ position: "", zIndex: 2, paddingTop: 100 }}
      >
        <Text size="30px" weight={700} mt="xl">
          Cast
        </Text>

        <Carousel slideSize="12%" align="start" slidesToScroll={2} mt="xl" loop>
          {cast.map((actor) => (
            <Carousel.Slide key={actor.id}>
              <Group spacing="md" align="center">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                      : "https://placehold.co/150x228"
                  }
                  width={150}
                  height={228}
                  fit="cover"
                  alt={actor.name}
                />
                <Stack spacing={0}>
                  <Text size="sm" weight={600}>
                    {actor.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {actor.character}
                  </Text>
                </Stack>
              </Group>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
};

export default TVShowDetailPage;
