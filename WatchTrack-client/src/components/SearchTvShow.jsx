import { useState, useEffect } from 'react';
import { TextInput, Button, Container } from '@mantine/core';
import { Card, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchTvShow = (props) => {
    const [query, setQuery] = useState('');
    const [tvShowResult, setTvShowResult] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5005/watchlist/${props.watchlist}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setWatchlist(data);
            })
            .catch((err) => console.log(err));
    }, [props.watchlist]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(
            `http://localhost:5005/tmdb/tv/search/${query}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setTvShowResult(data);
                } else {
                    setTvShowResult([]);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleAdd = (id) => {
        const updatedWatchlist = { ...watchlist, tvShows: [...watchlist.tvShows, id] };

        axios.put(`http://localhost:5005/watchlist/${props.watchlist}`, updatedWatchlist)
            .then((res) => {
                console.log('Response:', res.data);
                setWatchlist(res.data);
                props.populateTvShows(); // Refresh the TV shows
                return fetch(`http://localhost:5005/tmdb/tv/${id}`);
            })
            .then((res) => res.json())
            .then((tvShow) => {
                props.setSelectedTvShows((prevTvShows) => [...prevTvShows, tvShow]);
            })
            .catch((err) => {
                console.error('Error updating watchlist:', err);
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
                Tv Shows
            </Text>
            <Carousel
                
                mt={20}
                type="container"
                slideSize={{ base: "100%", "300px": "50%", "500px": "20%" }}
                slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
                loop
                align="start"
            >
                {tvShowResult.map((tvShow, index) => (
                    <Carousel.Slide key={index}>
                        <Link to={`/movie/${tvShow.id}`}>
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
                                    {tvShow.name}
                                </Text>
                              
                            </Card>
                        </Link>
                        <Button onClick={() => handleAdd(tvShow.id)}>Add</Button>
                    </Carousel.Slide>
                ))}
            </Carousel>
 
        </Container>
    );
};

export default SearchTvShow;
