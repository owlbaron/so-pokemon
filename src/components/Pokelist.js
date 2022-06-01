import { useQuery } from "@apollo/client";
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
import React from "react";

import { GetAllPokemons } from "../graphql/query";
import { pad } from "../utils/pad";

export const Pokelist = () => {
  const { data, loading } = useQuery(GetAllPokemons);

  if (loading) {
    return <h1>Carregando...</h1>;
  }
  console.log(data);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {data.pokemon_v2_pokemon.map((pokemon) => (
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
                      {pokemon.pokemon_v2_pokemontypes.map((pokemonType) => (
                        <img
                          key={pokemonType.pokemon_v2_type.name}
                          width="24px"
                          title={pokemonType.pokemon_v2_type.name}
                          alt={pokemonType.pokemon_v2_type.name}
                          src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/${pokemonType.pokemon_v2_type.name}.svg`}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
