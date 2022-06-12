import {
  alpha,
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { SearchContext } from "../contexts/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: "150px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    maxWidth: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "26ch",
      },
    },
  },
}));

export const Header = () => {
  const { dispatch } = useContext(SearchContext);
  const timer = useRef(null);

  const handleSearch = useCallback(
    (event) => {
      dispatch({ type: "start_typing" });
      clearTimeout(timer.current);
      const {
        target: { value },
      } = event;

      if (value.length === 0 || value.length >= 3) {
        timer.current = setTimeout(() => {
          dispatch({ type: "search", payload: value });

          setTimeout(() => {
            dispatch({ type: "stop_typing" });
          }, 500);
        }, 300);
      }
    },
    [dispatch]
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="h1">
            Só pokemon
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar"
              inputProps={{ "aria-label": "buscar" }}
              onChange={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: (theme) => `${theme.mixins.toolbar}px` }} />
    </>
  );
};
