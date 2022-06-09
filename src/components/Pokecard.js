import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { pad } from "../utils/pad";
import { typeToIcon } from "../constants/typeToIcon";

export const Pokecard = ({ id, name, height, weight, types }) => (
  <Card>
    <CardActionArea onClick={() => console.log("aaaaa")}>
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
