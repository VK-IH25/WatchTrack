import { useState, useContext } from "react";
import { Container, Text, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AddWatchlist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);


  const loggedUser = user._id;

  const navigate = useNavigate();

  const backendBaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWatchlist = { title, description, image, createdBy: loggedUser };

    fetch(`${backendBaseUrl}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWatchlist),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Watchlist created:", data._id);
        navigate(`/watchlist/${data._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container m={30} style={{ padding: "20px 0" }}>
      <Text size="xl" weight={700} mb="sm">
        Add Watchlist
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextInput
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextInput
          label="Cover Image URL"
          placeholder="Cover Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" mt="md">
          Add Watchlist
        </Button>
      </form>
    </Container>
  );
}

export default AddWatchlist;
