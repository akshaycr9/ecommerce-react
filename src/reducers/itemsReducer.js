let INITIAL_STATE = {
  items: [],
  error: null
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCHED_ITEMS":
      return { ...state, items: action.payload };
    case "ERROR_LOADING_ITEMS":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default itemsReducer;
