import axios from "axios";

export const fetchItems = () => {
  return async dispatch => {
    try {
      const items = await axios.get("https://grain.com.sg/menu.json");
      dispatch({
        type: "FETCHED_ITEMS",
        payload: Object.values(items.data).flat()
      });
    } catch (err) {}
  };
};
