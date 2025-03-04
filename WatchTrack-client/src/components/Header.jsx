import { Container, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "../styles/Header.css";

const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Container shadow="xs">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Text>WatchTrack</Text>
    </Container>
  );
};

export default Header;
