let INITIAL_STATE = {
  addedItems: [],
  total: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCHED_CART_ITEMS":
      return {
        ...state,
        addedItems: action.payload.items,
        total: action.payload.total
      };
    case "ITEM_ADDED":
      let existingItem = state.addedItems.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { ...state };
      } else {
        return {
          ...state,
          addedItems: [...state.addedItems, action.payload]
        };
      }
    case "QUANTITY_ADDED":
      return {
        ...state,
        addedItems: action.payload.cart,
        total: action.payload.total
      };
    case "QUANTITY_REMOVED":
      return {
        ...state,
        addedItems: action.payload.cart,
        total: action.payload.total
      };
    case "ITEM_REMOVED":
      return {
        ...state,
        addedItems: action.payload.cart,
        total: action.payload.total
      };
    default:
      return state;
  }
};

export default cartReducer;
