import axios from "axios";

export const fetchItems = () => {
  return async dispatch => {
    try {
      const items = await axios.get("https://grain.com.sg/menu.json");
      delete items.data["bundle_templates"];
      dispatch({
        type: "FETCHED_ITEMS",
        payload: Object.values(items.data).flat()
      });
    } catch (err) {
      dispatch({
        type: "ERROR_LOADING_ITEMS",
        error: "Please enable CORS in your browser and reload!"
      });
    }
  };
};

export const addToCart = id => {
  return {
    type: "ADD_TO_CART",
    payload: id
  };
};
