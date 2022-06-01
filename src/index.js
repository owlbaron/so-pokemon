import { ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { client } from "./graphql/client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
