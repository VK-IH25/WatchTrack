import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Watchlists from "./pages/Watchlists";
import SingleWatchlist from "./pages/singleWatchlist";
import Homepage from "./pages/homepage";
import AddWatchlist from "./pages/AddWatchlist";
import EditWatchlist from "./pages/EditWatchlist";
import MovieDetailPage from "./pages/MovieDetailPage";

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
        <Route path="/watchlists/add" element={<AddWatchlist></AddWatchlist>}/>
        <Route path="/watchlist/:id/edit" element={<EditWatchlist></EditWatchlist>} />

        <Route
          path="/movie/:id"
          element={<MovieDetailPage></MovieDetailPage>}
        />
      </Routes>

      <AppShell.Footer className="footer">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
