import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Text, Card, Avatar, Group, Button } from "@mantine/core";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const loggedUser = user;

  if (!loggedUser) {
    return (
      <Container size="md" style={{ textAlign: "center", padding: "50px" }}>
        <Text size="xl" weight={700}>
          Please sign in to view your profile.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="sm" my={40}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <Avatar size={100} radius="xl" />
          <div>
            <Text size="xl" weight={700}>
              {user?.username}
            </Text>
            <Text color="dimmed">{user?.email}</Text>
          </div>
        </Group>
      </Card>

      <Button fullWidth mt={20} color="red">
        Logout
      </Button>
    </Container>
  );
};

export default ProfilePage;
