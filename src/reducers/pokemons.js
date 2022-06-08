const initialState = {
  all: [],
  rendered: [],
  pointer: 0,
  total: 0,
};

const RENDER_MORE = 20;

export const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_POKEMONS":
      const initialPointer = RENDER_MORE;
      const initialRender = action.payload.slice(0, initialPointer);

      return {
        all: action.payload,
        rendered: initialRender,
        pointer: initialPointer,
        total: action.payload.length,
      };
    case "RENDER_MORE":
      const pointer = Math.min(state.pointer + RENDER_MORE, state.total);
      const pokemons = state.all.slice(state.pointer, pointer);

      return {
        ...state,
        rendered: [...state.rendered, ...pokemons],
        pointer: pointer,
      };
    default:
      return state;
  }
};
