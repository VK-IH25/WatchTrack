import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = (props) => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => {
              props.toggleDesktop();
              props.toggleMobile();
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/watchlists"
            onClick={() => {
              props.toggleDesktop();
              props.toggleMobile();
            }}
          >
            Watchlists
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            onClick={() => {
              props.toggleDesktop();
              props.toggleMobile();
            }}
          >
            Search
          </Link>
        </li>
        <li>
          <Link to="about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
