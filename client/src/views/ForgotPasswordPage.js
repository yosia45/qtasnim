import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { forgotPasswordUser } from "../stores/actions/userAction";
import PulseLoader from "react-spinners/PulseLoader";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailOfForgotPassword, setEmailOfForgotPassword] = useState({
    email: "",
  });
  const [loadingPage, setLoadingPage] = useState(false);
  const changeEmail = (e) => {
    const { name, value } = e.target;
    setEmailOfForgotPassword({ ...emailOfForgotPassword, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingPage(true);
    dispatch(forgotPasswordUser(emailOfForgotPassword.email))
      .then(() => {
        setLoadingPage(false);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password reset email sent!",
          text: "Check your email for further instructions!",
        });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
        });
      });
  };
  return (
    <div>
      {loadingPage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <PulseLoader color="#000" size={15} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 display-1">Forgot Password</h1>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="register-email">Email</label>
                <label className="text-danger text-end fw-bold">*</label>
              </div>
              <input
                type="email"
                className="form-control"
                id="register-email"
                placeholder="Enter email address ..."
                required
                name="email"
                onChange={changeEmail}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-lg btn-primary rounded-pill w-50 p-2"
                id="btn-sign-up"
                type="submit"
              >
                Submit
              </button>
              <NavLink
                to={"/login"}
                className="btn btn-lg btn-light rounded-pill w-50 p-2"
                id="btn-sign-up"
                type="cancel-forgot-password"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
