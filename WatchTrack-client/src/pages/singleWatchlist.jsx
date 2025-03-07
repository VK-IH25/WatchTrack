import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Text,
  Card,
  Image,
  Container,
  Button,
  Popover,
  Title,
  CloseButton,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import SearchMovie from "../components/SearchMovie";
import SearchTvShow from "../components/SearchTvShow";
import axios from "axios";

function SingleWatchlist() {
  const { id } = useParams();
  const [watchlist, setWatchlist] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedTvShows, setSelectedTvShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch(`http://localhost:5005/watchlist/${id}`);
        if (!res.ok) throw new Error("Failed to fetch watchlist");
        const data = await res.json();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, [id]);

  const populateMovies = useCallback(async () => {
    if (!watchlist?.movies?.length) return;
    try {
      const movies = await Promise.all(
        watchlist.movies.map(async (movie) => {
          const res = await fetch(`http://localhost:5005/tmdb/movies/${movie}`);
          if (!res.ok) throw new Error(`Failed to fetch movie: ${movie}`);
          return res.json();
        })
      );
      setSelectedMovies(movies.filter(Boolean));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [watchlist]);

  const populateTvShows = useCallback(async () => {
    if (!watchlist?.tvShows?.length) return;
    try {
      const tvShows = await Promise.all(
        watchlist.tvShows.map(async (show) => {
          const res = await fetch(`http://localhost:5005/tmdb/tv/${show}`);
          if (!res.ok) throw new Error(`Failed to fetch TV show: ${show}`);
          return res.json();
        })
      );
      setSelectedTvShows(tvShows.filter(Boolean));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  }, [watchlist]);

  useEffect(() => {
    if (watchlist) {
      populateMovies();
      populateTvShows();
    }
  }, [watchlist, populateMovies, populateTvShows]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5005/watchlist/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete watchlist");
      console.log("Watchlist deleted");
      navigate("/watchlists");
    } catch (error) {
      console.error("Error deleting watchlist:", error);
    }
  };

  const handleRemoveTvShow = (tvShowId) => {
    const updatedWatchlist = {
      ...watchlist,
      tvShows: watchlist.tvShows.filter((id) => id !== tvShowId.toString()),
    };

    axios
      .put(`http://localhost:5005/watchlist/${watchlist._id}`, updatedWatchlist)
      .then((res) => {
        console.log("Response:", res.data);
        setWatchlist(res.data);

        setSelectedTvShows((prevTvShows) =>
          prevTvShows.filter((tvShow) => tvShow.id !== tvShowId)
        );
      })
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

  const handleRemoveMovie = (movieId) => {
    const updatedWatchlist = {
      ...watchlist,
      movies: watchlist.movies.filter((id) => id !== movieId.toString()),
    };

    axios
      .put(`http://localhost:5005/watchlist/${watchlist._id}`, updatedWatchlist)
      .then((res) => {
        console.log("Response:", res.data);
        setWatchlist(res.data);

        setSelectedTvShows((prevmovies) =>
          prevmovies.filter((tvShow) => tvShow.id !== movieId)
        );
      })
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

  return (
    <Container style={{ padding: "20px 0" }}>
      {watchlist && (
        <div>
          <Title order={2}>
            {watchlist.title || "No title available"}
            <Button
              variant="outline"
              ml={20}
              onClick={() => navigate("/watchlists")}
              style={{ marginBottom: "20px" }}
            >
              Back
            </Button>
          </Title>

          <p>{watchlist.description || "No description available"}</p>

          {/* Movies Section */}
          <Text size="xl" weight={700} mt={50} mb="sm">
            Movies
            <Popover
              width={620}
              shadow="md"
              withArrow
              withOverlay
              zIndex={10001}
              offset={{ mainAxis: 17, crossAxis: 50 }}
            >
              <Popover.Target>
                <Button ml={20}>Add Movie</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <SearchMovie
                  watchlist={id}
                  populateMovies={populateMovies}
                  setSelectedMovies={setSelectedMovies}
                />
              </Popover.Dropdown>
            </Popover>
          </Text>

          <Carousel
            mb={50}
            type="container"
            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
            loop
            align="start"
          >
            {selectedMovies.map((movie, index) => (
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
                <CloseButton
                  onClick={() => handleRemoveMovie(movie.id)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "25px",
                    backgroundColor: "#cf3917",
                    color: "white",
                  }}
                ></CloseButton>
              </Carousel.Slide>
            ))}
          </Carousel>

          {/* TV Shows Section */}
          <Text size="xl" weight={700} mt={30} mb="sm">
            TV Shows
            <Popover
              width={620}
              shadow="md"
              withArrow
              withOverlay
              zIndex={10001}
              offset={{ mainAxis: 17, crossAxis: 50 }}
            >
              <Popover.Target>
                <Button ml={20}>Add TV Show</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <SearchTvShow
                  watchlist={id}
                  populateTvShows={populateTvShows}
                  setSelectedTvShows={setSelectedTvShows}
                />
              </Popover.Dropdown>
            </Popover>
          </Text>

          <Carousel
            mb={50}
            type="container"
            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
            loop
            align="start"
          >
            {selectedTvShows.map((tvShow, index) => (
              <Carousel.Slide key={index}>
                <Link to={`/tv/${tvShow.id}`}>
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      {tvShow.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                          height={270}
                          fit="cover"
                          alt={tvShow.name}
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
                      {tvShow.name}
                    </Text>
                  </Card>
                </Link>
                <CloseButton
                  onClick={() => handleRemoveTvShow(tvShow.id)}
                ></CloseButton>
              </Carousel.Slide>
            ))}
          </Carousel>

          <Link to={`/watchlist/${id}/edit`}>
            <Button mt={20} mr={20}>
              Edit
            </Button>
          </Link>
          <Button mt={20} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </Container>
  );
}

export default SingleWatchlist;
