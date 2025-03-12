import { Container, Title, Text, Button, Grid, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../styles/HeroBanner.css";
import appmockup from "../assets/app-mockup.png";

const HeroBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="heroBanner">
      <Container size="xl" className="content">
        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={1} className="title">
              Welcome to Your Movie & TV Show Tracker
            </Title>

            <div className="features">
              <div className="featureItem">
                <Text size="lg" color="white">
                  ✓ Easily create and manage your watchlists
                </Text>
              </div>
              <div className="featureItem">
                <Text size="lg" color="white">
                  ✓ Discover movies and TV shows based on categories
                </Text>
              </div>
              <div className="featureItem">
                <Text size="lg" color="white">
                  ✓ Get notifications for your favorite content's availability
                </Text>
              </div>
              <div className="featureItem">
                <Text size="lg" color="white">
                  ✓ Track what you're watching and get recommendations
                </Text>
              </div>
            </div>

            <Button
              size="lg"
              mt={30}
              className="button"
              onClick={() => navigate("/signup")}
            >
              SIGN UP
            </Button>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} my={30}>
            <Image src={appmockup} alt="WatchTrack Preview" fit="cover" />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default HeroBanner;
