import { useEffect, useState, useContext } from "react";
import { Container, Text, TextInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function EditWatchlist() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const backendBaseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5005";

  useEffect(() => {
    fetch(`${backendBaseUrl}/watchlist/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((err) => console.log(err));
  }, [id, getToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWatchlist = { title, description };

    fetch(`${backendBaseUrl}/watchlist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updatedWatchlist),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Watchlist updated:", data);
        navigate(`/watchlist/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container size="xl" mt={120} style={{ padding: "20px 0" }}>
      <Text size="xl" weight={700} mb="sm">
        Edit Watchlist
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
        <Button type="submit" mt="md">
          Update Watchlist
        </Button>
      </form>
    </Container>
  );
}

export default EditWatchlist;
