import { Button, Container, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import "../styles/Page404.css";

const NotFoundPage = () => {
  return (
    <Container className="root" size="md">
      <div className="label">404</div>
      <Title order={2} className="title">
        You have found a secret place.
      </Title>
      <Text color="dimmed" size="lg" ta="center" className="description">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center" mt="md">
        <Button variant="subtle" size="md" component={Link} to="/">
          Take me back to the home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFoundPage;
