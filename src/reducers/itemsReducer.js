let INITIAL_STATE = {
  items: []
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCHED_ITEMS":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export default itemsReducer;
