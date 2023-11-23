import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser, registerUser } from "../stores/actions/userAction";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const changeUserLogin = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const changeUserRegister = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const clearState = () => {
    setNewUser({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };
  const registerHandler = (e) => {
    dispatch(registerUser(newUser))
      .then(() => {
        Swal.fire(`Account succesfully created`, "", "success");
        clearState();
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
        clearState();
      });
  };
  const loginHandler = (e) => {
    dispatch(loginUser(userLogin))
      .then(() => {
        navigate("/");
        Swal.fire(`Welcome ${localStorage.getItem("username")}`, "", "success");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      });
  };
  return (
    <div>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in and autocomplete your order with your personal data, or
              sign up to enjoy all the benefits of an Qtasnim Store.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <div className="form-signin m-auto">
                  <form
                    id="register-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      registerHandler();
                    }}
                  >
                    <h1 className="h3 mb-3 display-1">Sign up and enjoy</h1>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="register-username">Username</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="register-username"
                        placeholder="Enter your username ..."
                        required
                        name="username"
                        onChange={changeUserRegister}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="register-email">Email</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="register-email"
                        placeholder="Enter email address ..."
                        required
                        name="email"
                        onChange={changeUserRegister}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="register-password">Password</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="register-password"
                        placeholder="Enter your password ..."
                        required
                        name="password"
                        onChange={changeUserRegister}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="register-phone">Role</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <select onChange={changeUserRegister} name="role">
                        <option value="" disabled selected>
                          Choose your role's account
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Client">Client</option>
                      </select>
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                      id="btn-sign-up"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form
                    id="login-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      loginHandler();
                    }}
                  >
                    <h1 className="h3 mb-3 display-1">
                      Log in to your account
                    </h1>
                    <span>
                      Log in on your profile to purchase and sell items from our best seller
                      with your personal data.
                    </span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        name="email"
                        onChange={changeUserLogin}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        name="password"
                        onChange={changeUserLogin}
                      />
                    </div>
                    <button
                      id="btn-login"
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                    >
                      Log In
                    </button>
                  <NavLink
                      to={'/forgotpassword'}
                      id="btn-login"
                      className="btn btn-lg btn-light rounded-pill w-100 p-2"
                      style={{marginTop: '10px'}}
                      type="submit"
                    >
                      Forgot Password
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
