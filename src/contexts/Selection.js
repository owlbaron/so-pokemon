import React, { createContext } from "react";

export const PokemonMock = {
  pokemon: {
    id: 0,
    name: "MissingNo",
    height: 6,
    weight: 128,
    types: [{ name: "bird" }, { name: "???" }],
  },
};

export const SelectionContext = createContext(PokemonMock);

export const selectedReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_POKEMON":
      return {
        pokemon: action.payload.pokemon,
      };
    case "CLEAR_SELECTION":
      return {
        pokemon: PokemonMock.pokemon,
      };
    default:
      return state;
  }
};

export const SelectionProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(selectedReducer, PokemonMock);

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};
