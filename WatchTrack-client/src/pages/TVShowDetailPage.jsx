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
  Card,
  Popover,
} from "@mantine/core";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import AddTvShowToWatchlist from "../components/AddTvShowToWatchlist";
import TVShowCommentsSection from "./TVShowCommentsSection";
import { AuthContext } from "../context/auth.context";
import { notifications } from '@mantine/notifications';

const TVShowDetailPage = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { user, setUser } = useContext(AuthContext);
  const { getToken } = useContext(AuthContext);

  const [isSeenIt, setIsSeenIt] = useState(false);

  const [loggedUser, setLoggedUser] = useState(null);

  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedTvShows, setWatchedTvShows] = useState([]);


  const navigate = useNavigate();
  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

useEffect(() => {
    if (loggedUser && Array.isArray(loggedUser.tvShows)) {
      if(loggedUser.tvShows.includes(id.toString())){
        setIsSeenIt(true);
      };
    }
  }, [watchedTvShows, loggedUser, id]);


  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const tvShowResponse = await axios.get(
          `${backendBaseUrl}/tmdb/tv/${id}`
        );
        console.log("TV Show: ", tvShowResponse.data);
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

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount
  
    if (user) {
      const token = localStorage.getItem("authToken");
  
      axios.get(`${API_URL}/auth/my-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async (userDetails) => {
        if (!isMounted) return; // Stop execution if unmounted
  
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
  
          if (isMounted) {
            setWatchedMovies(movies.filter(Boolean));
            setWatchedTvShows(tvShows.filter(Boolean));
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
    }
  
    return () => {
      isMounted = false; // Cleanup function to prevent updates after unmount
    };
  }, [user]);

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

  const addSeenIt = () => {
    if (!user) return;

    const updatedMovies = [...loggedUser.tvShows, id.toString()];
    const updatedUser = { ...user, tvShows: updatedMovies };

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

    const updatedMovies = loggedUser.tvShows.filter((movieId) => movieId !== id.toString());
    const updatedUser = { ...user, tvShows: updatedMovies };

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


  return (
    <Container size="xxl" style={{ padding: "50px", position: "relative" }}>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: isMobile ? "145vh" : "80vh",
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
          height: isMobile ? "145vh" : "80vh",
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
        cols={{ base: "100%", sm: "100%", md: "2" }}
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
            <Text color="white">•</Text>
            <Text color="white">⭐ {tvShow.vote_average}</Text>
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
                <AddTvShowToWatchlist movieId={id} />
              </Popover.Dropdown>
            </Popover>
            <Button
              radius="xl"
              size="md"
              component="a"
              href={tvShow.homepage}
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
            {tvShow.overview}
          </Text>
        </Stack>
      </SimpleGrid>

      <Container size="xxl" style={{ zIndex: 2, paddingTop: 250 }}>
        <Text size="30px" weight={700} mt="xl">
          Networks
        </Text>
        <Group spacing="md" mt="xl">
          {tvShow.networks.map((network) => (
            <Box
              key={network.id}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`}
                alt={network.name}
                fit="contain"
              />
            </Box>
          ))}
        </Group>
        <Divider my="xl" />
        <Text size="30px" weight={700} mt="xl">
          Seasons ({tvShow.number_of_seasons})
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3, lg: 6 }} spacing="lg" mt="xl">
          {tvShow.seasons.map((season) => (
            <Card
              key={season.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                      : "https://placehold.co/200x300"
                  }
                  alt={season.name}
                  fit="cover"
                  style={{ minHeight: "370px" }}
                />
              </Card.Section>
              <Stack mt="sm">
                <Text size="lg" weight={600}>
                  {season.name} ({season.episode_count} episodes)
                </Text>
                <Text size="sm" color="dimmed">
                  {season.air_date || "Unknown release date"}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      <Container size="xxl" style={{ zIndex: 2 }}>
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
        <TVShowCommentsSection id={id} backendBaseUrl={backendBaseUrl} />
      </Container>
    </Container>
  );
};

export default TVShowDetailPage;
