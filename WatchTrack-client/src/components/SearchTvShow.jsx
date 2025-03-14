import { useState, useEffect, useContext } from "react";
import { TextInput, Button, Container } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { notifications } from "@mantine/notifications";

const SearchTvShow = (props) => {
  const [query, setQuery] = useState("");
  const [tvShowResult, setTvShowResult] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const { getToken } = useContext(AuthContext);

  const navigate = useNavigate();

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
    axios
      .get(`${backendBaseUrl}/tmdb/tv/search/${query}`)
      .then((res) => {
        if (res) {
          setTvShowResult(res.data.results);
        } else {
          setTvShowResult([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (id) => {
    const updatedWatchlist = {
      ...watchlist,
      tvShows: [...watchlist.tvShows, id],
    };

    axios
      .put(`${backendBaseUrl}/watchlist/${props.watchlist}`, updatedWatchlist, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        console.log("Response:", res.data);
        setWatchlist(res.data);
        props.populateTvShows();
        notifications.show({
          title: "Show added",
          message: "Your watchlist has been updated",
        });
        return fetch(`${backendBaseUrl}/tmdb/tv/${id}`);
      })
      .then((res) => res.json())
      .then((tvShow) => {
        props.setSelectedTvShows((prevTvShows) => [...prevTvShows, tvShow]);
      })
      .catch((err) => {
        console.error("Error updating watchlist:", err);
      });
  };

  return (
    <Container mt={20} style={{ padding: "20px 0" }}>
      <form onSubmit={handleSearch}>
        <TextInput
          placeholder="Search for a TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <Button type="submit" mt="md" mb={20}>
          Search
        </Button>
      </form>
      <Text size="xl" weight={700} mb="sm">
        TV Shows
      </Text>
      <Carousel
        mt={20}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "33%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {tvShowResult.map((tvShow, index) => (
          <Carousel.Slide
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
            <Button
              size={"compact-sm"}
              rightSection={"+"}
              onClick={() => handleAdd(tvShow.id)}
            >
              Add
            </Button>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default SearchTvShow;
