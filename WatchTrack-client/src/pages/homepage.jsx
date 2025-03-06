import { useState } from "react";
import { Tabs, Container } from "@mantine/core";
import MoviesCarousel from "../components/MoviesCarousel";
import TVShowsCarousel from "../components/TVShowsCarousel";
import HeroBanner from "../components/HeroBanner";

function Homepage() {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div>
      <HeroBanner />
      <Container size="xl" style={{ padding: "50px 0" }}>
        <Tabs
          defaultValue="movies"
          value={activeTab}
          onChange={(value) => setActiveTab(value)}
          color="dark"
        >
          <Tabs.List grow>
            <Tabs.Tab value="movies">Movies</Tabs.Tab>
            <Tabs.Tab value="tv">TV Shows</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="movies">
            <div className="carousel-section">
              <MoviesCarousel category="Trending Movies" />
              <MoviesCarousel category="Popular Movies" />
              <MoviesCarousel category="Top Rated Movies" />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="tv">
            <div className="carousel-section">
              <TVShowsCarousel category="Trending TV Shows" />
              <TVShowsCarousel category="Popular TV Shows" />
              <TVShowsCarousel category="Top Rated TV Shows" />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}

export default Homepage;
