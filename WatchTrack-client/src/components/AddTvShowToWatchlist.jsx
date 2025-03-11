import { Button, Title, Text, Card, Flex } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notifications } from '@mantine/notifications';

function AddTvShowToWatchlist(props) {
    const [watchlists, setWatchlists] = useState([]);
    const { user } = useContext(AuthContext);
    const { getToken } = useContext(AuthContext);
    const { id } = useParams();
    
    


    useEffect(() => {
        fetch("http://localhost:5005/watchlist")
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
            const res = await axios.get(`http://localhost:5005/watchlist/${wid}`);
            const updatedWatchlist = {
                ...res.data,
                tvShows: [...res.data.tvShows, id], // Ensure movie ID is added
            };

            // Update the watchlist
            await axios.put(`http://localhost:5005/watchlist/${wid}`, updatedWatchlist, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });

            notifications.show({
                      title: 'Show added',
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

export default AddTvShowToWatchlist;
