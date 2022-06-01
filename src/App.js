import { CssBaseline } from "@mui/material";
import React from "react";
import { Layout } from "./components/Layout";
import { Pokelist } from "./components/Pokelist";

export const App = () => (
  <Layout>
    <CssBaseline />
    <Pokelist />
  </Layout>
);
