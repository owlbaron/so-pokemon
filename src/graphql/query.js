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

export const GetFlavorText = gql`
  query GetFlavorText($language_id: Int = 9, $pokemon_id: Int = 1) {
    pokemon_v2_pokemonspeciesflavortext(
      where: {
        language_id: { _eq: $language_id }
        pokemon_species_id: { _eq: $pokemon_id }
        pokemon_v2_pokemonspecy: {}
      }
      order_by: { id: desc }
    ) {
      flavor_text
    }
  }
`;
