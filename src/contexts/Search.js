import React, { createContext } from "react";

export const SearchContext = createContext("");

const searchReducer = (state, action) => {
  switch (action.type) {
    case "start_typing": {
      return { ...state, searching: true };
    }
    case "search": {
      return { searching: true, search: action.payload };
    }
    case "stop_typing": {
      return { ...state, searching: false };
    }
    default: {
      return state;
    }
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(searchReducer, {
    searching: false,
    search: "",
  });

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
