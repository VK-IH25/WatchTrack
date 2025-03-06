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
      <Container size="xl" mb="xxl" style={{ padding: "20px 0" }}>
        <Tabs value={activeTab} onChange={setActiveTab} color="dark">
          <Tabs.List grow>
            <Tabs.Tab value="movies">Movies</Tabs.Tab>
            <Tabs.Tab value="tv">TV Shows</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="movies">
            <div className="carousel-section">
              <Link to="/movies/trending">
                <MoviesCarousel
                  category="Trending Movies"
                  activeTab={activeTab}
                />
              </Link>
              <Link to="/movies/popular">
                <MoviesCarousel
                  category="Popular Movies"
                  activeTab={activeTab}
                />
              </Link>
              <Link to="/movies/toprated">
                <MoviesCarousel
                  category="Top Rated Movies"
                  activeTab={activeTab}
                />
              </Link>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="tv">
            <div className="carousel-section">
              <Link to="/tv/trending">
                <TVShowsCarousel
                  category="Trending TV Shows"
                  activeTab={activeTab}
                />
              </Link>
              <Link to="/tv/popular">
                <TVShowsCarousel
                  category="Popular TV Shows"
                  activeTab={activeTab}
                />
              </Link>
              <Link to="/tv/top-rated">
                <TVShowsCarousel
                  category="Top Rated TV Shows"
                  activeTab={activeTab}
                />
              </Link>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}

export default Homepage;
