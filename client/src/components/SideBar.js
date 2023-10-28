import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div>
      <nav
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        id="sidebar-menu"
      >
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
              <NavLink
                to={"/types"}
                className="nav-link"
                id="nav-product"
              >
                <span className="icon material-symbols-outlined me-2">
                  Types
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
