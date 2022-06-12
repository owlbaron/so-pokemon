import { CssBaseline } from "@mui/material";
import React from "react";
import { Layout } from "./components/Layout";
import { Pokelist } from "./components/Pokelist";
import { SearchProvider } from "./contexts/Search";
import { SelectionProvider } from "./contexts/Selection";

export const App = () => (
  <SearchProvider>
    <SelectionProvider>
      <Layout>
        <CssBaseline />
        <Pokelist />
      </Layout>
    </SelectionProvider>
  </SearchProvider>
);
