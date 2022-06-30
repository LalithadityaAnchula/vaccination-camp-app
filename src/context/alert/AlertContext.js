import alertReducer from "./AlertReducer";
import { createContext, useReducer } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: {
        message,
        type,
      },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 1200);
  };

  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alert: state,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
