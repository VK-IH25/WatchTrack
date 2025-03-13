import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  Input,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import React from "react";
import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container size={420} my={40} mt={120}>
      <Title ta="center">Welcome!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={signup}>
          <TextInput
            label="Email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Username"
            type="text"
            placeholder="Choose your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" color="#3d8d7a" />
          </Group>
          <Button type="submit" variant="filled" fullWidth mt="xl">
            Sign Up
          </Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </Paper>
    </Container>
  );
};

export default SignUp;
