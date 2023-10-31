import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../stores/actions/userAction";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(loginUserAction(false));
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        id="sidebar-menu"
      >
        <h3 style={{marginLeft:'14px'}}>Qtasnim {localStorage.getItem("role")} Panel</h3>
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link" id="nav-dashboard">
                <span className="icon material-symbols-outlined me-2">
                  Items
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/types"} className="nav-link" id="nav-product">
                <span className="icon material-symbols-outlined me-2">
                  Types
                </span>
              </NavLink>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Account</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item" id="greeting-nav">
              <a className="nav-link">
                Hey,{" "}
                <span id="username">{localStorage.getItem("username")}</span>
              </a>
            </li>
            <li className="nav-item" id="logout-nav">
              <a
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  logoutHandler();
                }}
                id="nav-logout"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
