import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import Layout from "./Layout/Layout";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <AppRoutes />
    </MantineProvider>
  );
}
