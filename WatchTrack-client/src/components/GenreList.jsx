import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Grid, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import poster from "../assets/poster.jpg";

const GenreList = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(`${backendBaseUrl}/tmdb/movie/genre`),
          axios.get(`${backendBaseUrl}/tmdb/tv/genre`),
        ]);
        console.log(moviesResponse.data.genres);
        setMovieGenres(moviesResponse.data.genres);
        setTvGenres(tvResponse.data.genres);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading genres...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

  return (
    <>
      <Title order={2} align="center" mb="lg">
        Browse by Genre
      </Title>

      <Title order={3} mt="md">
        Movie Genres
      </Title>
      <Grid gutter="md" mt="sm">
        {movieGenres.map((genre) => (
          <Grid.Col key={genre.id} span={2} md={3}>
            {console.log("Movie ID: ", genre.id)}
            <Card
              shadow="sm"
              padding="lg"
              withBorder
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                cursor: "pointer",
                height: 120,
              }}
              onClick={() => navigate(`/genre/movie/${genre.id}`)}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "inherit",
                }}
              />
              <Text
                align="center"
                weight={500}
                color="white"
                style={{ position: "relative", zIndex: 1 }}
              >
                {genre.name}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Title order={3} mt="xl">
        TV Genres
      </Title>
      <Grid gutter="md" mt="sm">
        {tvGenres.map((genre) => (
          <Grid.Col key={genre.id} span={2} md={3}>
            <Card
              shadow="sm"
              padding="lg"
              withBorder
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                cursor: "pointer",
                height: 120,
              }}
              onClick={() => navigate(`/genre/tv/${genre.id}`)}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "inherit",
                }}
              />
              <Text
                align="center"
                weight={500}
                color="white"
                style={{ position: "relative", zIndex: 1 }}
              >
                {genre.name}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default GenreList;
