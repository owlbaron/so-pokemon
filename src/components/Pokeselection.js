import {
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Pokecard } from "./Pokecard";
import { GetFlavorText } from "../graphql/query";
import { useQuery } from "@apollo/client";

export const Pokeselection = ({ pokemon, dispatch }) => {
  const ENGLISH = 9;

  const { loading, error, data } = useQuery(GetFlavorText, {
    variables: {
      language_id: ENGLISH,
      pokemon_id: pokemon.id,
    },
  });

  if (error) {
    console.log(error);
    return <div>ERRO: {error.mesage}</div>;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        alignItems: "center",
        py: 1,
        position: "fixed",
        width: "20%",
        right: 0,
        top: (theme) => {
          console.log(theme.mixins.toolbar);
          return `${theme.mixins.toolbar.minHeight}px`;
        },
      }}
    >
      <Stack direction="column" justifyContent="space-between" spacing={2}>
        <div style={{ display: "flex", alignSelf: "flex-end" }}>
          <IconButton
            onClick={() => {
              dispatch({ type: "CLEAR_SELECTION" });
            }}
          >
            <CloseIcon color="white" sx={{ fontSize: "50px" }} />
          </IconButton>
        </div>
        {loading ? (
          <CircularProgress sx={{ display: "flex", alignSelf: "center" }} />
        ) : (
          <>
            <Pokecard
              id={pokemon.id}
              name={pokemon.name}
              height={pokemon.height}
              weight={pokemon.weight}
              types={pokemon.types}
            />
            <Typography variant="h5" component="h2">
              {data.pokemon_v2_pokemonspeciesflavortext[0].flavor_text}
            </Typography>
          </>
        )}
      </Stack>
    </Container>
  );
};
