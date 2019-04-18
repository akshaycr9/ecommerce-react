let INITIAL_STATE = {
  addedItems: [],
  total: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ITEM_ADDED":
      return { ...state, addedItems: [...state.addedItems, action.payload] };
    default:
      return state;
  }
};

export default cartReducer;
