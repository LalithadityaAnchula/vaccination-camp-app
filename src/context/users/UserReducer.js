const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "UNSET_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_USER":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "REGISTER_USER":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoading: false,
        user: {},
        slots: [],
        camps: [],
      };
    case "GET_CITIES":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "GET_CITY":
      return {
        ...state,
        isLoading: false,
      };
    case "ADD_CITY":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "GET_CAMPS":
      return {
        ...state,
        isLoading: false,
        camps: action.payload,
      };
    case "GET_CAMP":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_SLOTS":
      return {
        ...state,
        isLoading: false,
        slots: action.payload,
      };
    case "ADD_CAMP":
      return {
        ...state,
        isLoading: false,
        camps: [...state.camps, action.payload],
      };
    case "ADD_SLOT":
      return {
        ...state,
        isLoading: false,
        slots: [...state.slots, action.payload],
      };
    case "BOOK_SLOT":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_CAMP":
      return {
        ...state,
        isLoading: false,
        camps: state.camps.map((camp) => {
          if (camp._id === action.payload._id) return action.payload;
          return camp;
        }),
      };
    case "UPDATE_CITY":
      return {
        ...state,
        isLoading: false,
        cities: state.camps.map((city) => {
          if (city._id === action.payload._id) return action.payload;
          return city;
        }),
      };
    case "UPDATE_SLOT":
      return {
        ...state,
        isLoading: false,
        slots: state.slots.map((slot) => {
          if (slot._id === action.payload._id) return action.payload;
          return slot;
        }),
      };
    case "GET_REQUESTS":
      return {
        ...state,
        isLoading: false,
        requests: action.payload,
      };
    case "ACCEPT_REQUEST":
      return {
        ...state,
        isLoading: false,
        requests: state.requests.filter((request) => {
          if (request._id !== action.payload._id) return request;
        }),
      };
    default:
      return state;
  }
};

export default appReducer;
