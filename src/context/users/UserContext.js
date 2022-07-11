import { createContext, useReducer } from "react";
import Reducer from "./UserReducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    user: {},
    cities: [],
    camps: [],
    slots: [],
    requests: [],
    sessions: [],
    stats: {},
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
