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
import Homepage from "./components/homepage";
import AddWatchlist from "./components/AddWatchlist";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className="header">
        <Header />
      </AppShell.Header>
 
  
      
        <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/watchlists" element={<Watchlists></Watchlists>} />
        <Route path="/watchlist/:id" element={<SingleWatchlist></SingleWatchlist>} />
        <Route path="/addwatchlist" element={<AddWatchlist></AddWatchlist>}/>

      </Routes>




      <AppShell.Footer className="footer">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
