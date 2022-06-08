import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { typeToIcon } from "../constants/typeToIcon";
import { SearchContext } from "../contexts/Search";
import Lottie from "lottie-react";
import pokeballLoadingAnimation from "../lottie/pokeball-loading.json";

import { GetAllPokemons } from "../graphql/query";
import { pad } from "../utils/pad";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-hook-inview";

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
                <Card sx={{ minHeight: 320 }}>
                  <CardActionArea onClick={() => console.log("aaaaa")}>
                    <CardMedia
                      component="img"
                      image={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(
                        pokemon.id,
                        3
                      )}.png`}
                      alt={`Pokemon: ${pokemon.name}`}
                      sx={{ objectFit: "fill" }}
                    />
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Box>
                          <Typography textTransform="capitalize" variant="h6">
                            {`#${pad(pokemon.id, 3)}`}
                          </Typography>
                          <Typography textTransform="capitalize" variant="h5">
                            {pokemon.name}
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">
                              {`${pokemon.height} m`}
                            </Typography>
                            <Typography variant="subtitle1">
                              {`${pokemon.weight} kg`}
                            </Typography>
                          </Stack>
                        </Box>
                        <Stack spacing={2}>
                          {pokemon.pokemon_v2_pokemontypes.map(
                            (pokemonType) => {
                              const Type =
                                typeToIcon[pokemonType.pokemon_v2_type.name];

                              return (
                                <Type key={pokemonType.pokemon_v2_type.name} />
                              );
                            }
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
  );
};
