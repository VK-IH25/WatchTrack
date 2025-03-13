import { useState, useEffect, useContext } from "react";
import { TextInput, Button, Container } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { notifications } from '@mantine/notifications';

const SearchMovie = (props) => {
  const [query, setQuery] = useState("");
  const [moviesResult, setMoviesResult] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const { getToken } = useContext(AuthContext);

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";


  useEffect(() => {
    fetch(`${backendBaseUrl}/watchlist/${props.watchlist}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWatchlist(data);
      })
      .catch((err) => console.log(err));
  }, [props.watchlist, getToken]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`${backendBaseUrl}/tmdb/movies/search/${query}`)
      .then((res) => {
        if (res) {
          setMoviesResult(res.data.results);

        } else {
          setTvShowResult([])
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (movieId) => {
    const updatedWatchlist = {
      ...watchlist,
      movies: [...watchlist.movies, movieId],
    };

    axios
      .put(
        `${backendBaseUrl}/watchlist/${props.watchlist}`,
        updatedWatchlist,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      )
      .then((res) => {
        console.log("Response:", res.data);
        setWatchlist(res.data);
        props.populateMovies();
        return fetch(`${backendBaseUrl}/tmdb/movies/${movieId}`);
      })
      .then((res) => res.json())
      .then((movie) => {
        props.setSelectedMovies((prevMovies) => [...prevMovies, movie])
        notifications.show({
          title: 'Movie added',
          message: 'Your watchlist has been updated',
        })
      }

      )
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

  return (
    <Container mt={20} style={{ padding: "20px 0" }}>
      <form onSubmit={handleSearch}>
        <TextInput
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <Button type="submit" mt="md" mb={20}>
          Search
        </Button>


      </form>
      <Text size="xl" weight={700} mb="sm">
        Movies
      </Text>
      <Carousel
        mt={20}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "33%" }}
        slideGap={"10"}
        loop
        align="start"
      >
        {moviesResult.map((movie, index) => (
          <Carousel.Slide
            key={index}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
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
                <Text align="center" mt="sm" size="xs" lineClamp={2}>
                  {movie.title}
                </Text>
              </Card>
            </Link>
            <Button onClick={() => handleAdd(movie.id)}>Add</Button>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default SearchMovie;
