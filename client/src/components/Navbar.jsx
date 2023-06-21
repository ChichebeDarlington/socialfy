import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav bg-dark d-flex justify-content-between">
      <Link to="/" className="nav-link text-light">
        Home
        {/* <a className="nav-link text-light">Home</a> */}
      </Link>

      <Link to="/login" className="nav-link text-light">
        Login
        {/* <a className="nav-link text-light">Login</a> */}
      </Link>

      <Link to="/register" className="nav-link text-light">
        Register
        {/* <a className="nav-link text-light">Register</a> */}
      </Link>
    </nav>
  );
};

export default Nav;
