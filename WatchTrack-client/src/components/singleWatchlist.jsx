import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Card, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

function SingleWatchlist() {
    const { id } = useParams();
    const [watchlist, setWatchlist] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5005/watchlist/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWatchlist(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    console.log(watchlist);

    return (
        <div>
            {watchlist && (
                <div>
                    <>
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
        </div>
    );
}

export default SingleWatchlist;