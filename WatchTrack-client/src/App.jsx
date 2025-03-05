import { AppShell, Burger } from "@mantine/core";
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
import Sidebar from "./components/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AuthDetails from "./auth/AuthDetails";
import Search from "./components/Search";

function App() {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
       header={{ height: 60 }}>
      <AppShell.Header className="header">
        <Burger
          lineSize={3}
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
          className="burger"
        />
        <Burger
          lineSize={3}
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
          className="burger"
        />
        <Header />
        <AuthDetails></AuthDetails>
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} />
      </AppShell.Navbar>

      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="signin" element={<SignIn></SignIn>} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/watchlists" element={<Watchlists></Watchlists>} />
        <Route path="/watchlist/:id" element={<SingleWatchlist></SingleWatchlist>} />
        <Route path="/watchlists/add" element={<AddWatchlist></AddWatchlist>} />
        <Route path="/watchlist/:id/edit" element={<EditWatchlist></EditWatchlist>} />
        <Route path="/movies/search" element={<Search></Search>} />


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
