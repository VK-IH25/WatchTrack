import { Container, Burger, Text, Image } from "@mantine/core";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <Image src={logo} alt="logo" h={80} className="logo" />
      </Link>
    </Container>
  );
};

export default Header;
