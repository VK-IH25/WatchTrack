import { useState } from 'react';
import { TextInput, Button, Container } from '@mantine/core';
import { Card, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom'; // Import Link

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [moviesResult, setMoviesResult] = useState([]);
    const [tvResult, setTvResult] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        handleSearchMovie(e);
        handleSearchTv(e);
    }


    const handleSearchMovie = (e) => {
        e.preventDefault();
        fetch(
            `http://localhost:5005/tmdb/movies/search/${query}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setMoviesResult(data);
                } else {
                    setMoviesResult([]);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleSearchTv = (e) => {
        e.preventDefault();
        fetch(
            `http://localhost:5005/tmdb/tv/search/${query}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setTvResult(data);
                } else {
                    setTvResult([]);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container mt={120} style={{ padding: "20px 0" }}>
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
                height={320}
                mt={20}
                type="container"
                slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                loop
                align="start"
            >
                {moviesResult.map((movie, index) => (
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
                                <Text align="center" mt="sm" lineClamp={2}>
                                    {movie.description || "No description available"}
                                </Text>
                            </Card>
                        </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
            <Text size="xl" weight={700} mb="sm">
                Tv Shows
            </Text>
            <Carousel
                height={320}
                mt={20}
                type="container"
                slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                loop
                align="start"
            >
                {tvResult.map((movie, index) => (
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
                                <Text align="center" mt="sm" lineClamp={2}>
                                    {movie.description || "No description available"}
                                </Text>
                            </Card>
                        </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Container>
    );
};

export default Search;
