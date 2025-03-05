import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Container, Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Watchlists() {
    const [watchlists, setWatchlists] = useState([]);



    useEffect(() => {
        fetch("http://localhost:5005/watchlist")
            .then((res) => res.json())
            .then((data) => {
                setWatchlists(data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
      
            <Container size="xl" mt={80} style={{ padding: "20px 0" }}>

            <Link to="/addwatchlist">
            <Button mb={50}>Create Watchlist</Button>
            </Link>

            <Text size="xl" weight={700} mb="sm">
                Watchlists
            </Text>

            <Carousel
                height={320}
                type="container"
                slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                loop
                align="start"
            >
                {watchlists.map((watchlist, index) => (
                    <Carousel.Slide key={index}>
                        <Link to={`/watchlists/${watchlist._id}`}>
                        <Card shadow="sm" padding="lg">
                            <Card.Section>
                                {watchlist.poster_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${watchlist.poster_path}`}
                                        height={270}
                                        fit="cover"
                                        alt={watchlist.title}
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
     
        </Container>
    
    );
}

export default Watchlists;