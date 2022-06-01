import { gql } from "@apollo/client";

export const GetAllPokemons = gql`
  query GetAllPokemons {
    pokemon_v2_pokemon {
      name
      id
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;
