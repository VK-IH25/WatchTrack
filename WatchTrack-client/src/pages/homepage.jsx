import { useState } from "react";
import { Tabs, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import MoviesCarousel from "../components/MoviesCarousel";
import TVShowsCarousel from "../components/TVShowsCarousel";
import HeroBanner from "../components/HeroBanner";

function Homepage() {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div>
      <HeroBanner />
      <Container size="xl" my={50}>
        <Tabs value={activeTab} onChange={setActiveTab} color="dark">
          <Tabs.List grow>
            <Tabs.Tab value="movies">Movies</Tabs.Tab>
            <Tabs.Tab value="tv">TV Shows</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="movies">
            <div className="carousel-section">
              <MoviesCarousel category="nowplaying" activeTab={activeTab} />
              <MoviesCarousel category="trending" activeTab={activeTab} />
              <MoviesCarousel category="popular" activeTab={activeTab} />
              <MoviesCarousel category="toprated" activeTab={activeTab} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="tv">
            <div className="carousel-section">
              <TVShowsCarousel category="trending" activeTab={activeTab} />
              <TVShowsCarousel category="popular" activeTab={activeTab} />
              <TVShowsCarousel category="toprated" activeTab={activeTab} />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}

export default Homepage;
