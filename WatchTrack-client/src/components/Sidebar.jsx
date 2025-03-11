import React, { useState } from "react";
import { NavLink, ScrollArea } from "@mantine/core";
import {
  IconHome2,
  IconList,
  IconSearch,
  IconInfoCircle,
  IconMovie,
  IconDeviceTv,
  IconChevronRight,
} from "@tabler/icons-react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({ movies: false, tvShows: false });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { label: "Home", to: "/", icon: <IconHome2 size={16} stroke={1.5} /> },
    {
      label: "Watchlists",
      to: "/watchlists",
      icon: <IconList size={16} stroke={1.5} />,
    },
    {
      label: "Search",
      to: "/search",
      icon: <IconSearch size={16} stroke={1.5} />,
    },
    {
      label: "About Us",
      to: "/about",
      icon: <IconInfoCircle size={16} stroke={1.5} />,
    },
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

        {/* Movies Menu */}
        <NavLink
          label="Movies"
          leftSection={<IconMovie size={16} stroke={1.5} />}
          rightSection={
            <IconChevronRight
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

        {/* TV Shows Menu */}
        <NavLink
          label="TV Shows"
          leftSection={<IconDeviceTv size={16} stroke={1.5} />}
          rightSection={
            <IconChevronRight
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
