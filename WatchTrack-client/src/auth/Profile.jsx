import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Container,
  Text,
  Card,
  Avatar,
  Group,
  Button,
  Title,
  Image,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedTvShows, setWatchedTvShows] = useState([]);

  const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("authToken");

      axios
        .get(`${API_URL}/auth/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (userDetails) => {
          setLoggedUser(userDetails.data);

          try {
            const movies = await Promise.all(
              userDetails.data.movies.map(async (movie) => {
                const res = await axios.get(`${API_URL}/tmdb/movies/${movie}`);
                return res.data;
              })
            );

            const tvShows = await Promise.all(
              userDetails.data.tvShows.map(async (tvShow) => {
                const res = await axios.get(`${API_URL}/tmdb/tv/${tvShow}`);
                return res.data;
              })
            );

            setWatchedMovies(movies.filter(Boolean));
            setWatchedTvShows(tvShows.filter(Boolean));
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        })

        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [user]);

  if (!loggedUser) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Text size="xl" weight={700}>
          Please sign in to view your profile.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="lg" my={40}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <Avatar size={100} radius="xl" />
          <div>
            <Text size="xl" weight={700}>
              {loggedUser?.username}
            </Text>
            <Text color="dimmed">{user?.email}</Text>
          </div>
        </Group>
      </Card>
      <Title order={3} mt={50}>
        Watched Movies
      </Title>
      <Carousel
        mt={50}
        mb={50}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {watchedMovies.map((movie, index) => (
          <Carousel.Slide key={index}>
            <Link to={`/movie/${movie.id}`}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      height={270}
                      fit="cover"
                      alt={movie.title}
                    />
                  ) : (
                    <div
                      style={{
                        height: 270,
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </Card.Section>
                <Text align="center" mt="sm" lineClamp={1}>
                  {movie.title}
                </Text>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Title order={3} mt={50}>
        Watched TvShows
      </Title>
      <Carousel
        mt={50}
        mb={50}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {watchedTvShows.map((movie, index) => (
          <Carousel.Slide key={index}>
            <Link to={`/movie/${movie.id}`}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      height={270}
                      fit="cover"
                      alt={movie.title}
                    />
                  ) : (
                    <div
                      style={{
                        height: 270,
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </Card.Section>
                <Text align="center" mt="sm" lineClamp={1}>
                  {movie.name}
                </Text>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Button fullWidth mt={20} color="red" onClick={logOutUser}>
        Logout
      </Button>
    </Container>
  );
};

export default ProfilePage;
