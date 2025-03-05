import React from "react";
import { Link } from "react-router-dom";


const Sidebar = (props) => {


  return (
    <nav className="sidebar">
      <ul>
        <li>
        <Link to="/" onClick={() => {
            props.toggleDesktop();
            props.toggleMobile();
          }}>
           Home
          </Link>
        </li>
        <li>
        <Link to="/watchlists" onClick={() => {
            props.toggleDesktop();
            props.toggleMobile();
          }}>
           Watchlists
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;
