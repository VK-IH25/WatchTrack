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


  import { useNavigate } from "react-router";
  
  const SignUp = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
    const signup = (e) => {
      e.preventDefault();
    };
    return (
      <Container size={420} my={40} mt={120}>
        <Title ta="center" >
          Welcome!
        </Title>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={signup}>
            <TextInput
              label="Email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button
              type="submit"
              variant="filled"
              fullWidth
              mt="xl"
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    );
  };
  
  export default SignUp;
  