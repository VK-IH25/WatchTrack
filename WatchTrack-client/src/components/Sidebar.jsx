import React, { useState } from "react";
import { NavLink, ScrollArea } from "@mantine/core";
import {
  FaHome,
  FaList,
  FaSearch,
  FaInfoCircle,
  FaFilm,
  FaTv,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({ movies: false, tvShows: false });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { label: "Home", to: "/", icon: <FaHome size={16} /> },
    { label: "Watchlists", to: "/watchlists", icon: <FaList size={16} /> },
    { label: "Search", to: "/search", icon: <FaSearch size={16} /> },
    { label: "About Us", to: "/about", icon: <FaInfoCircle size={16} /> },
  ];

  const moviesSubmenu = [
    { label: "Now Playing", to: "/movies/category/nowplaying" },
    { label: "Trending Movies", to: "/movies/category/trending" },
    { label: "Popular Movies", to: "/movies/category/popular" },
    { label: "Top Rated Movies", to: "/movies/category/toprated" },
  ];

  const tvShowsSubmenu = [
    { label: "Trending TV Shows", to: "/tv/category/trending" },
    { label: "Popular TV Shows", to: "/tv/category/popular" },
    { label: "Top Rated TV Shows", to: "/tv/category/toprated" },
  ];

  return (
    <nav className="sidebar">
      <ScrollArea className="links">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            label={item.label}
            component="a"
            href={item.to}
            leftSection={item.icon}
          />
        ))}

        <NavLink
          label="Movies"
          leftSection={<FaFilm size={16} />}
          rightSection={
            <FaChevronRight
              size={12}
              className={openMenus.movies ? "rotate" : ""}
            />
          }
          active={openMenus.movies}
          onClick={() => toggleMenu("movies")}
        />
        {openMenus.movies && (
          <div className="submenu">
            {moviesSubmenu.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                component="a"
                href={item.to}
              />
            ))}
          </div>
        )}

        <NavLink
          label="TV Shows"
          leftSection={<FaTv size={16} />}
          rightSection={
            <FaChevronRight
              size={12}
              className={openMenus.tvShows ? "rotate" : ""}
            />
          }
          active={openMenus.tvShows}
          onClick={() => toggleMenu("tvShows")}
        />
        {openMenus.tvShows && (
          <div className="submenu">
            {tvShowsSubmenu.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                component="a"
                href={item.to}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </nav>
  );
};

export default Sidebar;
