import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Loader,
  Grid,
  Group,
  Container,
  Button,
} from "@mantine/core";
import axios from "axios";

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
        // Fetch movie details
        const movieResponse = await axios.get(
          `${backendBaseUrl}/tmdb/movies/${id}`
        );
        setMovie(movieResponse.data);

        // Fetch movie cast
        const castResponse = await axios.get(
          `${backendBaseUrl}/movies/${id}/credits`
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
    return <Loader size="xl" />;
  }

  if (!movie) {
    return <Text>No movie found</Text>;
  }

  return (
    <Container size="xl" style={{ padding: "100px 0" }}>
      <Button
        variant="outline"
        size="lg"
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>

      <Card>
        <Card.Section>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            height={400}
            fit="contain"
            alt={movie.title}
          />
        </Card.Section>
        <Text align="center" size="xl" weight={700} mt="sm">
          {movie.title}
        </Text>
        <Text align="center" color="dimmed" size="sm" mt="xs">
          {movie.release_date} | {movie.runtime} mins |{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </Text>
        <Text mt="sm">{movie.overview}</Text>

        <Grid mt="lg">
          <Grid.Col span={12}>
            <Group spacing="md" direction="row" wrap>
              {cast.slice(0, 6).map((actor) => (
                <div key={actor.id} style={{ textAlign: "center" }}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    radius="md"
                    width={100}
                    height={150}
                  />
                  <Text size="sm" mt="xs" weight={500}>
                    {actor.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {actor.character}
                  </Text>
                </div>
              ))}
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default MovieDetailPage;
