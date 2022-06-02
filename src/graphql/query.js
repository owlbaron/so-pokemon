import { gql } from "@apollo/client";

export const GetAllPokemons = gql`
  query GetAllPokemons($search: String!) {
    pokemon_v2_pokemon(
      where: { name: { _ilike: $search }, is_default: { _eq: true } }
    ) {
      id
      name
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
