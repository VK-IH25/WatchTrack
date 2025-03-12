import React, { useEffect, useState, useContext } from "react";
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
  Popover,
} from "@mantine/core";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import AddMovieToWatchlist from "../components/AddMovietoWatchlist";
import MovieCommentsSection from "./MovieCommentsSection";
import { AuthContext } from "../context/auth.context";
import { notifications } from '@mantine/notifications';


const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { user, setUser } = useContext(AuthContext);
  const { getToken } = useContext(AuthContext);

  const [isSeenIt, setIsSeenIt] = useState(false);

  const navigate = useNavigate();
  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

    useEffect(() => {
      if (user) {
        setIsSeenIt(user.movies.includes(id.toString()));
      }
    }, [user, id]);

    console.log(isSeenIt);
        

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
        } catch (error) {
          console.error("Error fetching movie details:", error);
        } finally {
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

  const addSeenIt = () => {
    if (!user) return;

    const updatedMovies = [...user.movies, id.toString()];
    const updatedUser = { ...user, movies: updatedMovies };

    axios
      .put(`${backendBaseUrl}/auth/edit/${user._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setUser(response.data);
        setIsSeenIt(true);
        notifications.show({
          title: 'Your watch history has been updated',
          message: 'Check your profile page to full history',
      })
      })
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

  const removeSeenIt = () => {
    if (!user) return;

    const updatedMovies = user.movies.filter((movieId) => movieId !== id.toString());
    const updatedUser = { ...user, movies: updatedMovies };

    axios
      .put(`${backendBaseUrl}/auth/edit/${user._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setUser(response.data);
        setIsSeenIt(false);
        notifications.show({
          title: 'Your watch history has been updated',
          message: 'Check your profile page to full history',
      })
      })
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

console.log(user)
  return (
    <Container size="xxl" style={{ padding: "50px", position: "relative" }}>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: isMobile ? "1300px" : "700px",
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
          height: isMobile ? "1300px" : "700px",
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
        cols={{ base: 1, md: 2 }}
        spacing="xl"
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
            <Text color="white">•</Text>
            <Text color="white">⭐ {movie.vote_average}</Text>
          </Group>
          <Divider my="xl" />
          <Group mt="xl">
            <Popover
              width={620}
              shadow="md"
              withArrow
              withOverlay
              zIndex={10001}
              offset={{ mainAxis: 17, crossAxis: 50 }}
            >
              <Popover.Target>
                <Button radius="xl" size="md" variant="light">
                  + Add to Watchlist
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <AddMovieToWatchlist movieId={id} />
              </Popover.Dropdown>
            </Popover>

            <Button
              radius="xl"
              size="md"
              component="a"
              href={movie.homepage}
              target="_blank"
            >
              ▶ Watch Now
            </Button>
            {isSeenIt ? (
              <Button variant="subtle" size="md" onClick={removeSeenIt}>
                Unsee it
              </Button>
            ) : (
              <Button variant="subtle" size="md" onClick={addSeenIt}>
                Already seen it?
              </Button>
            )}
          </Group>
          <Text my="xl" color="white" size="md">
            {movie.overview}
          </Text>
        </Stack>
      </SimpleGrid>

      <Container size="xxl" style={{ zIndex: 2, paddingTop: 230 }}>
        <Text size="30px" weight={700} mt="xl">
          Networks
        </Text>
        <Group spacing="md" mt="xl">
          {movie.production_companies.map((company) => (
            <Box
              key={company.id}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                alt={company.name}
                fit="contain"
              />
            </Box>
          ))}
        </Group>
        <Divider my="xl" />
        <Text size="30px" weight={700} mt="xl">
          Cast
        </Text>

        <Carousel
          slideSize={isMobile ? "40%" : "12%"}
          align="start"
          slidesToScroll={isMobile ? 1 : 2}
          mt="xl"
          loop
        >
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

      <Container size="xxl" style={{ zIndex: 2 }}>
        <MovieCommentsSection movieId={id} backendBaseUrl={backendBaseUrl} />
      </Container>
    </Container>
  );
};

export default MovieDetailPage;
