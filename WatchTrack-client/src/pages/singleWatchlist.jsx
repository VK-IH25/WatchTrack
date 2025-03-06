import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Card, Image, Container, Button, ActionIcon } from '@mantine/core';

import { Carousel } from '@mantine/carousel';
import { Link, useNavigate } from 'react-router-dom';

function SingleWatchlist() {
    const { id } = useParams();
    const [watchlist, setWatchlist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5005/watchlist/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWatchlist(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5005/watchlist/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Watchlist deleted:', data);
                navigate('/watchlists');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container size="xl" mt={120} style={{ padding: "20px 0" }}>
            {watchlist && (
                <div>
                    <>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/watchlists")}
                            style={{ marginBottom: "20px" }}
                        >
                            Back
                        </Button>
                        <h1>{watchlist.title || "No title available"}</h1>
                        <p>{watchlist.description || "No description available"}</p>
                    </>
                    <>

                        <Text size="xl" weight={700} mb="sm">
                            Movies
                        </Text>

                        <Carousel
                            height={320}
                            type="container"
                            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                            loop
                            align="start"
                        >
                            {watchlist.movies.map((watchlist, index) => (
                                <Carousel.Slide key={index}>
                                    <Link to={`/watchlist/${watchlist._id}`}>
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
                                            <Text align="center" mt="sm" lineClamp={1}>
                                                {watchlist.title}
                                            </Text>
                                            <Text align="center" mt="sm" lineClamp={2}>
                                                {watchlist.description || "No description available"}
                                            </Text>
                                        </Card>
                                    </Link>
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </>
                    <>
                        <Text size="xl" weight={700} mb="sm">
                            Tv Shows
                        </Text>

                        <Carousel
                            height={320}
                            type="container"
                            slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                            loop
                            align="start"
                        >
                            {watchlist.movies.map((watchlist, index) => (
                                <Carousel.Slide key={index}>
                                    <Link to={`/watchlist/${watchlist._id}`}>
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
                                            <Text align="center" mt="sm" lineClamp={1}>
                                                {watchlist.title}
                                            </Text>
                                            <Text align="center" mt="sm" lineClamp={2}>
                                                {watchlist.description || "No description available"}
                                            </Text>
                                        </Card>
                                    </Link>
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </>
                </div>

            )}
            <Link to={`/watchlist/${id}/edit`}>
                <Button mr={20}>Edit</Button>
            </Link>
            <Button onClick={handleDelete}>Delete</Button>

        </Container>
    );
}

export default SingleWatchlist;