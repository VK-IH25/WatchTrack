import { Container, Title, Text, Button } from "@mantine/core";
import "../styles/HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="heroBanner">
      <Container className="content">
        <Title order={1} className="title">
          Find Your Favorite Movies & Shows
        </Title>
        <Text size="lg" className="subtitle">
          Stream the latest and greatest content.
        </Text>
        <Button size="lg" className="button">
          Explore Now
        </Button>
      </Container>
    </div>
  );
};

export default HeroBanner;
