import {
  BASE_URL,
  FETCH_ITEM,
  FETCH_ITEM_BY_ID,
  ADD_ITEM,
  EDIT_ITEM,
  EDIT_ITEM_STATUS,
  DELETE_ITEM,
} from "./actionType";

export const fetchItemAction = (payload) => {
  return {
    type: FETCH_ITEM,
    payload,
  };
};

export const fetchItemByIdAction = (payload) => {
  return {
    type: FETCH_ITEM_BY_ID,
    payload,
  };
};

export const addItemAction = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const editItemAction = (payload) => {
  return {
    type: EDIT_ITEM,
    payload,
  };
};

export const editItemStatusAction = (payload) => {
  return {
    type: EDIT_ITEM_STATUS,
    payload,
  };
};

export const deleteItemAction = (payload) => {
  return {
    type: DELETE_ITEM,
    payload,
  };
};

export const fetchItems = () => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items`, {
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
        dispatch(fetchItemAction(data));
      });
  };
};

export const fetchItemById = (id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items/${id}`, {
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
        dispatch(fetchItemByIdAction(data));
      });
  };
};

export const addItem = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items`, {
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
        return response.json();
      })
      .then((data) => {
        dispatch(addItemAction(bodyToAdd));
        return data;
      });
  };
};

export const editItem = (bodyToEdit, id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: bodyToEdit,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        dispatch(editItemAction(bodyToEdit));
        return data;
      });
  };
};

export const editItemStatus = (bodyToEdit, id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: bodyToEdit,
    })
    .then((response) => {
      if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        dispatch(editItemStatusAction(bodyToEdit));
        return data;
      });
  };
};

export const deleteItem = (id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        dispatch(deleteItemAction(data.data));
        return data;
      });
  };
};
