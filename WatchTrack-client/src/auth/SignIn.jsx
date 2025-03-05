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
  import { Link, useNavigate } from "react-router";

  
  const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
    const signin = (e) => {
      e.preventDefault();
    };
  
    return (
      <Container size={420} my={40} mt={120}>
        <Title ta="center" >
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <Link to="/signup">Create account</Link>
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={signin}>
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
              <Checkbox color="#3d8d7a" label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button type="submit"  fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    );
  };
  
  export default SignIn;
  