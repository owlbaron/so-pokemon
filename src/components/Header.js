import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Header = () => (
  <AppBar position="static">
    <Toolbar variant="dense">
      <Typography variant="h6" color="inherit" component="h1">
        Só pokemon
      </Typography>
    </Toolbar>
  </AppBar>
);
