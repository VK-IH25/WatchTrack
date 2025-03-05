import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  Avatar,
  MenuTarget,
  MenuDropdown,
  Menu,
  MenuItem,
  Button,
} from "@mantine/core";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);



  return (
    <div>
      {authUser ? (
        <div>
          <Menu closeOnClickOutside={true} closeOnItemClick={true}>
            <MenuTarget>
              <Avatar bg="white" color="#3d8d7a" radius="xl" />
            </MenuTarget>{" "}
            <MenuDropdown>
              <MenuItem>Profile</MenuItem>
              <Button >Sign Out</Button>
            </MenuDropdown>
          </Menu>
        </div>
      ) : (
        <div>
          <Menu closeOnClickOutside={true} closeOnItemClick={true}>
            <MenuTarget>
              <Avatar color="white" radius="xl" />
            </MenuTarget>{" "}
            <Menu.Dropdown>
              <MenuItem>
                <Link to="/signin">Log In</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup">Register</Link>
              </MenuItem>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
