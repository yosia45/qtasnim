import {
  BASE_URL,
  FETCH_ITEM,
  FETCH_ITEM_BY_ID,
  ADD_ITEM,
  EDIT_ITEM,
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

export const deleteItemAction = (payload) => {
  return {
    type: DELETE_ITEM,
    payload,
  };
};

export const fetchItems = () => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items`)
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
    return fetch(`${BASE_URL}/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchItemById(data));
      });
  };
};

export const addItem = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: bodyToAdd,
    })
      .then((response) => {W
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
      headers:{
        "Content-Type":"application/json"
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

export const deleteItem = (id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
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
