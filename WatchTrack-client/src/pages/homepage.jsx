import CategoryCarousel from "../components/CategoryCarousel";
import HeroBanner from "../components/HeroBanner";
import { Container } from "@mantine/core";

function Homepage() {
  return (
    <div>
      <HeroBanner />
      <Container size="xl" style={{ padding: "20px 0" }}>
        <div className="carousel-section">
          <CategoryCarousel
            title="Trending Movies"
            category="Trending Movies"
          />
          <CategoryCarousel
            title="Now Playing Movies"
            category="Now Playing Movies"
          />
          <CategoryCarousel title="Popular Movies" category="Popular Movies" />
          <CategoryCarousel
            title="Top Rated Movies"
            category="Top Rated Movies"
          />
        </div>
      </Container>
    </div>
  );
}

export default Homepage;
