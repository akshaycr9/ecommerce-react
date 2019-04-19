let INITIAL_STATE = {
  addedItems: [],
  total: 0,
  loading: false
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "ITEM_ADDED":
      let existingItem = state.addedItems.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { ...state, loading: false };
      } else {
        return {
          ...state,
          addedItems: [...state.addedItems, action.payload],
          loading: false
        };
      }
    case "QUANTITY_ADDED":
      let quantityAddItem = state.addedItems.find(
        item => item.id === action.payload.id
      );
      quantityAddItem.quantity += 1;
      return { ...state, loading: false };
    case "QUANTITY_REMOVED":
      let quantityRemovedItem = state.addedItems.find(
        item => item.id === action.payload.id
      );
      quantityRemovedItem.quantity -= 1;
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default cartReducer;
