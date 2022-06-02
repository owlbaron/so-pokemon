import { CssBaseline } from "@mui/material";
import React from "react";
import { Layout } from "./components/Layout";
import { Pokelist } from "./components/Pokelist";
import { SearchProvider } from "./contexts/Search";

export const App = () => (
  <SearchProvider>
    <Layout>
      <CssBaseline />
      <Pokelist />
    </Layout>
  </SearchProvider>
);
