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
              <a className="nav-link" href="" id="nav-dashboard">
                {" "}
                <span className="icon material-symbols-outlined me-2">
                  Products
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" id="nav-product">
                {" "}
                <span className="icon material-symbols-outlined me-2">
                  Types
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
