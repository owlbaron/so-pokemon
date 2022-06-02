import { ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { client } from "./graphql/client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  rootElement
);
