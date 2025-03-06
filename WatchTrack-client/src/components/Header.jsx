import { Container, Burger, Text, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Container>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Link to="/">
        <Image src={logo} alt="logo" h={80} className="logo" />
      </Link>
    </Container>
  );
};

export default Header;
