import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import App from "./App.jsx";
import myTheme from "./myTheme";
import '@mantine/notifications/styles.css';
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{ myTheme }}
      withGlobalStyles
      withNormalizeCSS
    >

      <BrowserRouter>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
