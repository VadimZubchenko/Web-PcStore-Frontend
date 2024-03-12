import { Link } from "react-router-dom";

// Navbar gets App component's functions via props
const Navbar = (props) => {
  let links = (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav"></ul>
    </div>
  );
  if (props.isLogged) {
    links = (
      <div className="row  m-1 p-0">
        <div className="col mt-4">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" style={{ marginRight: 30 }}>
                <Link className="nav-link" to="/">
                  Make Order
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 30 }}>
                <Link className="nav-link" to="/parts">
                  Add Parts
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 500 }}>
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li>
                <p
                  className="navbar-text my-2 m-1 p-0 font-monospace"
                  style={{ marginRight: 50 }}
                >
                  {props.role}
                  {": "}
                  {props.staff}
                </p>
              </li>
              <li className="nav-item" style={{ marginLeft: 20 }}>
                <Link className="nav-link" to="/logout" onClick={props.logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container mx-auto p-0">
        <div className="row">
          <div className="col">
            <p className="navbar-brand mt-3">PC Store</p>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        {links}
      </div>
    </nav>
  );
};
export default Navbar;
