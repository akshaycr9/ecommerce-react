INITIAL_STATE = {
  addedItems: [],
  total: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let addedItem = state.items.find(item => item.id === action.id);
    default:
      return state;
  }
};

export default cartReducer;
