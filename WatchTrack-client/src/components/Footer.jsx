import { Container, Text } from "@mantine/core";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <Container className="footer">
      <Text size="sm" align="center">
        &copy; 2025 WatchTrack. All rights reserved.
      </Text>
    </Container>
  );
};

export default Footer;
