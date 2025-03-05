import { AppShell, Container } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import CategoryCarousel from "./components/CategoryCarousel";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Watchlists from "./components/Watchlists";
import SingleWatchlist from "./components/singleWatchlist";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className="header">
        <Header />
      </AppShell.Header>
      <HeroBanner />
      <Container size="xl" style={{ padding: "20px 0" }}>
        <div className="carousel-section">
          <CategoryCarousel title="Trending Now" category="Trending Now" />
          <CategoryCarousel title="New Releases" category="New Releases" />
          <CategoryCarousel title="Popular Movies" category="Popular Movies" />
        </div>
      </Container>

      <Routes>
        <Route path="/" element="" />
        <Route path="/watchlists" element={<Watchlists></Watchlists>} />
        <Route path="/watchlist/:id" element={<SingleWatchlist></SingleWatchlist>} />
      </Routes>

      <AppShell.Footer className="footer">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
