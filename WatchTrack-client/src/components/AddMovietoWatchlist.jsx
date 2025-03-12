import { Button, Title, Text, Card, Flex } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notifications } from '@mantine/notifications';


function AddMovieToWatchlist(props) {
    const [watchlists, setWatchlists] = useState([]);
    const { user } = useContext(AuthContext);
    const { getToken } = useContext(AuthContext);
    const { id } = useParams();

    const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

    useEffect(() => {
        fetch(`${backendBaseUrl}/watchlist`)
            .then((res) => res.json())
            .then((data) => setWatchlists(data))
            .catch((err) => console.log("Error fetching watchlists:", err));
    }, []);

    const filteredWatchlists = user
        ? watchlists.filter((watchlist) => watchlist.createdBy === user._id)
        : [];

    const handleClick = async (wid) => {
        try {
            // Fetch the target watchlist
            const res = await axios.get(`${backendBaseUrl}/watchlist/${wid}`);
            const updatedWatchlist = {
                ...res.data,
                movies: [...res.data.movies, id], // Ensure movie ID is added
            };

            // Update the watchlist
            await axios.put(`${backendBaseUrl}/watchlist/${wid}`, updatedWatchlist, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });

            notifications.show({
                title: 'Movie added',
                message: 'Your watchlist has been updated',
            })


        } catch (err) {
            console.error("Error updating watchlist:", err);
        }
    };

    return (
        <div>
            {filteredWatchlists.map((watchlist) => (
                <div key={watchlist._id}>
                    <Card display={"flex"} shadow="sm" padding="lg" radius="md" withBorder>
                        <Flex justify="space-between" align="center">
                            <div>
                                <Title order={4}>{watchlist.title}</Title>
                                <Text size="sm">{watchlist.description}</Text>
                            </div>
                            <Button onClick={() => handleClick(watchlist._id)}>+</Button>
                        </Flex>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default AddMovieToWatchlist;
