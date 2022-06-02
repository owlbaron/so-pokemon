import { useLazyQuery } from "@apollo/client";
import {
  Box,
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

export const Pokelist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
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

      setData(result.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [loadPokemons, search, setIsLoading, setData]);

  useEffect(() => {
    getPokemons();
  }, [search, getPokemons]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
    >
      {searching || isLoading ? (
        <Box sx={{ width: "200px", height: "200px", mt: 8 }}>
          <Lottie animationData={pokeballLoadingAnimation} loop={true} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data.pokemon_v2_pokemon.map(
            (pokemon) =>
              pokemon.id <= 807 && (
                <Grid key={pokemon.id} item xs={3}>
                  <Card>
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
                                  <Type
                                    key={pokemonType.pokemon_v2_type.name}
                                  />
                                );
                              }
                            )}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      )}
    </Container>
  );
};
