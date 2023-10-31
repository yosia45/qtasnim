import {
  BASE_URL,
  FETCH_DETAIL,
  ADD_ADDSTOCK_DETAIL,
  ADD_BUYSTOCK_DETAIL,
} from "./actionType";

export const fetchDetailAction = (payload) => {
  return {
    type: FETCH_DETAIL,
    payload,
  };
};

export const addStockAdditionAction = (payload) => {
  return {
    type: ADD_ADDSTOCK_DETAIL,
    payload,
  };
};

export const addBuyStockAction = (payload) => {
  return {
    type: ADD_BUYSTOCK_DETAIL,
    payload,
  };
};

export const fetchDetails = () => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchDetailAction(data));
      });
  };
};

export const addStockAddition = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/details/addstock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: bodyToAdd,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
      })
      .then((data) => {
        dispatch(addStockAdditionAction(bodyToAdd));
        return data;
      });
  };
};

export const addBuyStock = (bodyToAdd) => {
  return (dispatch) => {
    console.log(bodyToAdd);
    return fetch(`${BASE_URL}/details/buystock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: bodyToAdd,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
      })
      .then((data) => {
        dispatch(addBuyStockAction(bodyToAdd));
        return data;
      });
  };
};
