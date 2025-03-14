import { useState, useEffect, useContext } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Container, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Watchlists() {
  const [watchlists, setWatchlists] = useState([]);
  const { user } = useContext(AuthContext);

  const admin = {
    _id: "67d168f147efec872eb942bb",
  };

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  useEffect(() => {
    fetch(`${backendBaseUrl}/watchlist`)
      .then((res) => res.json())
      .then((data) => {
        setWatchlists(data);
      })
      .catch((err) => console.log(err));
  }, []);

  let filteredWatchlists = [];

  if (user) {
    filteredWatchlists = watchlists.filter(
      (watchlist) => watchlist.createdBy === user._id
    );
  }

  let adminWatchlists = watchlists.filter(
    (watchlist) => watchlist.createdBy === admin._id
  );

  return (
    <Container size="xxl" m={50} style={{ padding: "20px 0" }}>
      <Link to="/watchlists/add">
        <Button mb={50}>Create Watchlist</Button>
      </Link>

      <Text size="xl" weight={700} mb="sm">
        Tailored by us
      </Text>

      <Carousel
        height={320}
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {adminWatchlists.map((watchlist, index) => (
          <Carousel.Slide key={index}>
            <Link to={`/watchlist/${watchlist._id}`}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  {watchlist.image ? (
                    <Image
                      src={`${watchlist.image}`}
                      style={{ height: "370px" }}
                      fit="cover"
                      alt={watchlist.title}
                    />
                  ) : (
                    <div
                      style={{
                        height: "370px",
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
                <Text align="center" mt="sm">
                  {watchlist.title}
                </Text>
                <Text align="center" mt="sm">
                  {watchlist.description || "No description available"}
                </Text>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Text mt={50} size="xl" weight={700} mb="sm">
        Your Watchlists
      </Text>

      <Carousel
        type="container"
        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
        loop
        align="start"
      >
        {filteredWatchlists.map((watchlist, index) => (
          <Carousel.Slide key={index}>
            <Link to={`/watchlist/${watchlist._id}`}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  {watchlist.image ? (
                    <Image
                      src={watchlist.image}
                      style={{ height: "370px" }}
                      fit="cover"
                      alt={watchlist.title}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "370px",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </Card.Section>
                <Text align="center" mt="sm">
                  {watchlist.title}
                </Text>
                <Text align="center" mt="sm" lineClamp={1}>
                  {watchlist.description || "No description available"}
                </Text>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}

export default Watchlists;
