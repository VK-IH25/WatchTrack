import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Text, Card, Image, Container, Button, Popover, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import SearchMovie from '../components/SearchMovie';
import SearchTvShow from '../components/SearchTvShow';

function SingleWatchlist() {
    const { id } = useParams();
    const [watchlist, setWatchlist] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [selectedTvShows, setSelectedTvShows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5005/watchlist/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWatchlist(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (watchlist && watchlist.movies) {
            populateMovies();
            populateTvShows();
        }
    }, [watchlist]);

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5005/watchlist/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                console.log('Watchlist deleted');
                navigate('/watchlists');
            })
            .catch((err) => console.log(err));
    };

    const populateMovies = () => {
        Promise.all(
            watchlist.movies.map((movie) =>
                fetch(`http://localhost:5005/tmdb/movies/${movie}`)
                    .then((res) => res.json())
                    .catch((err) => console.log(err))
            )
        ).then((movies) => setSelectedMovies(movies.filter(Boolean))); // Filter out failed requests
    };

    const populateTvShows = () => {
        Promise.all(
            watchlist.tvShows.map((show) =>
                fetch(`http://localhost:5005/tmdb/tv/${show}`)
                    .then((res) => res.json())
                    .catch((err) => console.log(err))
            )
        ).then((tvShows) => setSelectedTvShows(tvShows.filter(Boolean))); // Filter out failed requests
    };

    return (
        <Container m={50} mt={120} style={{ padding: "20px 0" }}>
            {watchlist && (
                <div>
                   
                    <Title order={2}>{watchlist.title || "No title available"}  
                        <Button
                        variant="outline"
                        ml={20}
                        onClick={() => navigate("/watchlists")}
                        style={{ marginBottom: "20px" }}
                    >
                        Back
                    </Button></Title>
                    
                    <p>{watchlist.description || "No description available"}</p>

                    <Text size="xl" weight={700} mt={50} mb="sm">
                        Movies
                        <Popover
                            width={620}
                            shadow="md"
                            withArrow
                            withOverlay
                            overlayProps={{ zIndex: 10000, blur: '8px' }}
                            zIndex={10001}
                            offset={{ mainAxis: 17, crossAxis: 50 }}
                        >
                            <Popover.Target>
                                <Button
                                   ml={20}
                                >
                                    Add Movie
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <SearchMovie watchlist={id} />
                            </Popover.Dropdown>
                        </Popover>
                    </Text>

                    <Carousel
                        height={320}
                        type="container"
                        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                        loop
                        align="start"
                    >
                        {selectedMovies.map((movie, index) => (
                            <Carousel.Slide key={index}>
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
                            </Carousel.Slide>
                        ))}
                    </Carousel>

                    <Text size="xl" weight={700} mt={30} mb="sm">
                        TV Shows
                        <Popover
                            width={620}
                            shadow="md"
                            withArrow
                            withOverlay
                            overlayProps={{ zIndex: 10000, blur: '8px' }}
                            zIndex={10001}
                            offset={{ mainAxis: 17, crossAxis: 50 }}
                        >
                            <Popover.Target>
                                <Button
                                    
                                    ml={20}
                                >
                                    Add Tv Show
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <SearchTvShow watchlist={id} />
                            </Popover.Dropdown>
                        </Popover>
                    </Text>

                    <Carousel
                        height={320}
                        type="container"
                        slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                        slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                        loop
                        align="start"
                    >
                        {selectedTvShows &&
                            selectedTvShows.map((tvShow, index) => (
                                <Carousel.Slide key={index}>
                                    <Card shadow="sm" padding="lg">
                                        <Card.Section>
                                            {tvShow.poster_path ? (
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                                                    height={270}
                                                    fit="cover"
                                                    alt={tvShow.title}
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
                                            {tvShow.title}
                                        </Text>
                                    </Card>
                                </Carousel.Slide>
                            ))}
                    </Carousel>

                    <Link to={`/watchlist/${id}/edit`}>
                        <Button mr={20}>Edit</Button>
                    </Link>
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            )}
        </Container>
    );
}

export default SingleWatchlist;
