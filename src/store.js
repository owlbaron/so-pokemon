import { createStore } from "redux";
import { pokemons } from "./reducers/pokemons";

export const store = createStore(pokemons);
