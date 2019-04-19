import axios from "axios";
import history from "../history";

export const fetchItems = () => {
  return async dispatch => {
    dispatch({ type: "LOADING" });
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

export const addToCart = item => {
  return async dispatch => {
    dispatch({ type: "LOADING" });
    try {
      const addItem = await axios.post(
        "http://localhost:5001/react-redux-router/us-central1/addItem",
        { item }
      );
      dispatch({ type: "ITEM_ADDED", payload: addItem.data.cart });
      history.push("/cart");
    } catch (error) {}
  };
};

export const addQuantity = id => {
  return async dispatch => {
    dispatch({ type: "LOADING" });
    const add = await axios.post(
      "http://localhost:5001/react-redux-router/us-central1/addQuantity",
      { id }
    );
    dispatch({ type: "QUANTITY_ADDED", payload: add.data.cart });
  };
};

export const removeQuantity = id => {
  return async dispatch => {
    dispatch({ type: "LOADING" });
    const remove = await axios.post(
      "http://localhost:5001/react-redux-router/us-central1/removeQuantity",
      { id }
    );
    dispatch({ type: "QUANTITY_REMOVED", payload: remove.data.cart });
  };
};

export const remove = id => {};
