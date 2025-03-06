import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";
import "@mantine/carousel/styles.css";

const TVShowsCarousel = ({ category, activeTab }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  const apiEndpoints = {
    "Trending TV Shows": `${backendBaseUrl}/tmdb/tv/trending`,
    "Popular TV Shows": `${backendBaseUrl}/tmdb/tv/popular`,
    "Top Rated TV Shows": `${backendBaseUrl}/tmdb/tv/toprated`,
  };

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiEndpoints[category]);
        setShows(response.data || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch TV shows. Please try again later.");
        console.log(error);
        setLoading(false);
      }
    };

    fetchShows();
  }, [category, activeTab]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Text color="red">{error}</Text>
      </div>
    );
  }

  return (
    <div style={{ margin: "50px 0px" }}>
      <Text size="xl" weight={700} mb="sm">
        {category}
      </Text>
      {shows.length > 0 && (
        <Carousel
          key={category}
          height={320}
          type="container"
          slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
          slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
          loop
          align="start"
        >
          {shows.map((show) => (
            <Carousel.Slide key={show.id}>
              <Link to={`/tv/${show.id}`}>
                <Card shadow="sm" padding="lg">
                  <Card.Section>
                    {show.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                        height={270}
                        fit="cover"
                        alt={show.name || "No Image"}
                      />
                    ) : (
                      <div
                        style={{
                          height: 270,
                          backgroundColor: "#ccc",
                          display: "flex",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </Card.Section>
                  <Text align="center" mt="sm" lineClamp={1}>
                    {show.name || "Unknown Title"}
                  </Text>
                </Card>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default TVShowsCarousel;
