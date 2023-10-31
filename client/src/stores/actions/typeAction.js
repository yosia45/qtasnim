import {
  FETCH_TYPE,
  FETCH_TYPE_BY_ID,
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

export const fetchTypeByIdAction = (payload) => {
  return {
    type: FETCH_TYPE_BY_ID,
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
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchTypesAction(data));
      });
  };
};

export const fetchTypeById = (id) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchTypeByIdAction(data));
      });
  };
};

export const addType = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: bodyToAdd,
    })
      .then((response) => {
        console.log(response);
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
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
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
        dispatch(deleteTypesAction(data.data));
        return data;
      });
  };
};
