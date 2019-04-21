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
        "http://localhost:5001/react-redux-router/us-central1/fetchCartItems"
      );
      dispatch({ type: "FETCHED_CART_ITEMS", payload: cartItems.data });
      dispatch(hideLoading());
    } catch (error) {
      dispatch({
        type: "ERROR_LOADING_ITEMS",
        error: "Please enable CORS in your browser and reload!"
      });
      dispatch(hideLoading());
    }
  };
};

export const addToCart = item => {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const addItem = await axios.post(
        "http://localhost:5001/react-redux-router/us-central1/addItem",
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
      "http://localhost:5001/react-redux-router/us-central1/addQuantity",
      { id }
    );

    dispatch({ type: "QUANTITY_ADDED", payload: add.data });
    dispatch(hideLoading());
  };
};

export const removeQuantity = id => {
  return async dispatch => {
    dispatch(showLoading());
    const remove = await axios.post(
      "http://localhost:5001/react-redux-router/us-central1/removeQuantity",
      { id }
    );
    dispatch({ type: "QUANTITY_REMOVED", payload: remove.data });
    dispatch(hideLoading());
  };
};

export const remove = id => {
  return async dispatch => {
    dispatch(showLoading());
    const removeItem = await axios.post(
      "http://localhost:5001/react-redux-router/us-central1/removeItem",
      { id }
    );
    dispatch({ type: "ITEM_REMOVED", payload: removeItem.data });
    dispatch(hideLoading());
  };
};
