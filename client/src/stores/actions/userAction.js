import {
  ADD_USERS,
  BASE_URL,
  LOGIN_USERS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./actionType";

export const registerUserAction = (payload) => {
  return {
    type: ADD_USERS,
    payload,
  };
};

export const loginUserAction = (payload) => {
  return {
    type: LOGIN_USERS,
    payload,
  };
};

export const forgotPasswordAction = (payload) => {
  return {
    type: FORGOT_PASSWORD,
    payload,
  };
};

export const resetPasswordAction = (payload) => {
  return {
    type: RESET_PASSWORD,
    payload,
  };
};

export const registerUser = (user) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        response.json();
      })
      .then(() => {
        dispatch(registerUserAction(user));
      });
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("resetToken", data.user.resetToken);
        dispatch(loginUserAction(true));
      });
  };
};

export const forgotPasswordUser = (user) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(forgotPasswordAction(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
