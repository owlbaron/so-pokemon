import { useLazyQuery } from "@apollo/client";
import { Box, Button, Container, Grid } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/Search";
import { SelectionContext } from "../contexts/Selection";
import Lottie from "lottie-react";
import pokeballLoadingAnimation from "../lottie/pokeball-loading.json";

import { GetAllPokemons } from "../graphql/query";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-hook-inview";
import { Pokecard } from "./Pokecard";
import { Pokeselection } from "./Pokeselection";

export const Pokelist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, hasMore } = useSelector((state) => ({
    data: state.rendered,
    hasMore: state.pointer <= state.total,
  }));
  const [buttonRef, shouldRenderMore] = useInView({
    rootMargin: window.innerHeight + "px",
    threshold: 0,
  });
  const dispatch = useDispatch();
  const [loadPokemons] = useLazyQuery(GetAllPokemons);
  const {
    state: { searching, search },
  } = useContext(SearchContext);
  const currentPokemon = useContext(SelectionContext);

  const getPokemons = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await loadPokemons({
        variables: { search: `%${search}%` },
      });

      dispatch({
        type: "LOAD_POKEMONS",
        payload: result.data.pokemon_v2_pokemon,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [loadPokemons, search, setIsLoading, dispatch]);

  const handleRenderMore = useCallback(() => {
    dispatch({ type: "RENDER_MORE" });
  }, [dispatch]);

  useEffect(() => {
    if (shouldRenderMore) {
      handleRenderMore();
    }
  }, [shouldRenderMore, handleRenderMore]);

  useEffect(() => {
    getPokemons();
  }, [search, getPokemons]);

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        {searching || isLoading ? (
          <Box sx={{ width: "200px", height: "200px", mt: 8 }}>
            <Lottie animationData={pokeballLoadingAnimation} loop={true} />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {data.map((pokemon) => (
                <Grid key={pokemon.id} item xs={3}>
                  <Pokecard
                    id={pokemon.id}
                    name={pokemon.name}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    types={pokemon.pokemon_v2_pokemontypes.map((type) => ({
                      name: type.pokemon_v2_type.name,
                    }))}
                  />
                </Grid>
              ))}
            </Grid>
            {hasMore && (
              <Box sx={{ mt: 4 }}>
                <Button
                  ref={buttonRef}
                  variant="contained"
                  onClick={handleRenderMore}
                >
                  Carregar mais
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
      {currentPokemon.state.pokemon.id !== 0 && (
        <Pokeselection
          pokemon={currentPokemon.state.pokemon}
          dispatch={currentPokemon.dispatch}
        />
      )}
    </Container>
  );
};
