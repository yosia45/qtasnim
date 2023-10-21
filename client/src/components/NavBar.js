export default function NavBar() {
  return (
    <div>
      <header
        className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow"
        id="navbar"
      >
        <a id="role-nav" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
          {" "}
          <img
            src="https://pbs.twimg.com/profile_images/1591075045291753474/XZrnUQDr_400x400.jpg"
            width="30"
            class="d-inline-block me-2"
            alt="Shiranui Logo"
          />
          Qtasnim Panel
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </header>
    </div>
  );
}
