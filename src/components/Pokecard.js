import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

import { pad } from "../utils/pad";
import { typeToIcon } from "../constants/typeToIcon";
import { SelectionContext } from "../contexts/Selection";

export const Pokecard = ({ id, name, height, weight, types }) => {
  let { dispatch } = useContext(SelectionContext);

  function handleCardClick() {
    dispatch({
      type: "SELECT_POKEMON",
      payload: {
        pokemon: {
          id: id,
          name: name,
          height: height,
          weight: weight,
          types: types,
        },
      },
    });
  }

  return (
    <Card>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          image={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(
            id,
            3
          )}.png`}
          alt={`Pokemon: ${name}`}
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Box>
              <Typography textTransform="capitalize" variant="h6">
                {`#${pad(id, 3)}`}
              </Typography>
              <Typography textTransform="capitalize" variant="h5">
                {name}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="subtitle1">{`${height} m`}</Typography>
                <Typography variant="subtitle1">{`${weight} kg`}</Typography>
              </Stack>
            </Box>
            <Stack spacing={2}>
              {types.map((type) => {
                const Type = typeToIcon[type.name];

                return <Type key={type.name} />;
              })}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
