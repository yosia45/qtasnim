import {
  FETCH_TYPE,
  ADD_TYPE,
  EDIT_TYPE,
  DELETE_TYPE,
  BASE_URL,
} from "../actions/actionType";

export const fetchTypesAction = (payload) => {
  return {
    type: FETCH_TYPE,
    payload,
  };
};

export const addTypesAction = (payload) => {
  return {
    type: ADD_TYPE,
    payload,
  };
};

export const editTypesAction = (payload) => {
  return {
    type: EDIT_TYPE,
    payload,
  };
};

export const deleteTypesAction = (payload) => {
  return {
    type: DELETE_TYPE,
    payload,
  };
};

export const fetchTypes = () => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchTypesAction(data));
      });
  };
};

export const addType = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: bodyToAdd,
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addTypesAction(bodyToAdd));
        return data;
      });
  };
};

export const editType = (bodyToEdit, id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types/${id}`, {
      method: "PATCH",
      body: bodyToEdit,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(editTypesAction(bodyToEdit));
        return data;
      });
  };
};

export const deleteType = (id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(deleteTypesAction(data.data));
        return data;
      });
  };
};
