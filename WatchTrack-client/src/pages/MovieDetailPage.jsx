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
// import "../styles/MovieDetailPage.css";
import { Carousel } from "@mantine/carousel";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `${backendBaseUrl}/tmdb/movies/${id}`
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `${backendBaseUrl}/tmdb/movies/${id}/credits`
        );

        setCast(castResponse.data.cast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Text size="xl" weight={700}>
          No movie found
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
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
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
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          radius="lg"
          style={{ maxWidth: "300px", margin: "auto" }}
        />

        <Stack spacing="sm">
          <Text size="35px" color="white" weight={900} lineClamp={1}>
            {movie.title}
          </Text>
          <Text size="lg" color="white">
            {movie.tagline || "No tagline available"}
          </Text>
          <Group spacing="xl" mt="md">
            <Text color="white">{movie.release_date}</Text>
            <Text color="white">•</Text>
            <Text color="white">{movie.runtime} mins</Text>
            <Text color="white">•</Text>
            <Text color="white">
              {movie.genres.map((g) => g.name).join(", ")}
            </Text>
          </Group>
          <Divider my="xl" />
          <Group mt="xl">
            <Button radius="xl" size="md" variant="light">
              + Add to Watchlist
            </Button>
            <Button
              radius="xl"
              size="md"
              component="a"
              href={movie.homepage}
              target="_blank"
            >
              ▶ Watch Now
            </Button>
            <Button variant="subtle" size="md">
              Already seen it?
            </Button>
          </Group>
          <Text my="xl" color="white" size="md">
            {movie.overview}
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

export default MovieDetailPage;
