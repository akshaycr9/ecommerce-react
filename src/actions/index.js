import axios from "axios";
import history from "../history";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const fetchItems = () => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const items = await axios.get("https://grain.com.sg/menu.json");
      delete items.data["bundle_templates"];
      dispatch({
        type: "FETCHED_ITEMS",
        payload: Object.values(items.data).flat()
      });
      dispatch(hideLoading());
    } catch (err) {
      dispatch({
        type: "ERROR_LOADING_ITEMS",
        error: "Please enable CORS in your browser and reload!"
      });
      dispatch(hideLoading());
    }
  };
};

export const fetchCartItems = () => {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const cartItems = await axios.get(
        "https://us-central1-react-redux-router.cloudfunctions.net/fetchCartItems"
      );
      dispatch({ type: "FETCHED_CART_ITEMS", cartItems: cartItems.data.items });
      dispatch(hideLoading());
    } catch (error) {}
  };
};

export const addToCart = item => {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const addItem = await axios.post(
        "https://us-central1-react-redux-router.cloudfunctions.net/addItem",
        { item }
      );
      dispatch({ type: "ITEM_ADDED", payload: addItem.data.cart });
      dispatch(hideLoading());
      return history.push("/cart");
    } catch (error) {}
  };
};

export const addQuantity = id => {
  return async dispatch => {
    dispatch(showLoading());
    const add = await axios.post(
      "https://us-central1-react-redux-router.cloudfunctions.net/addQuantity",
      { id }
    );

    dispatch({ type: "QUANTITY_ADDED", payload: add.data.cart });
    dispatch(hideLoading());
  };
};

export const removeQuantity = id => {
  return async dispatch => {
    dispatch(showLoading());
    const remove = await axios.post(
      "https://us-central1-react-redux-router.cloudfunctions.net/removeQuantity",
      { id }
    );
    dispatch({ type: "QUANTITY_REMOVED", payload: remove.data.cart });
    dispatch(hideLoading());
  };
};

export const remove = id => {
  return async dispatch => {
    dispatch(showLoading());
    const removeItem = await axios.post(
      "https://us-central1-react-redux-router.cloudfunctions.net/removeItem",
      { id }
    );
    dispatch({ type: "ITEM_REMOVED", payload: removeItem.data.cart });
    dispatch(hideLoading());
  };
};
