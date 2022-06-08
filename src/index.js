import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { client } from "./graphql/client";
import { store } from "./store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </Provider>,
  rootElement
);
