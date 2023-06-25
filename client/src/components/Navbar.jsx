import { Link } from "react-router-dom";
import { useStateContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [display, setDisplay] = useState(false);

  const { state, setState } = useStateContext();

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [current, window.location.pathname]);

  return (
    <nav className="nav bg-dark d-flex justify-content-between">
      <Link
        to="/"
        className={`nav-link text-light logo ${current === "/" && "active"}`}
      >
        SOCIALFY
      </Link>

      {state ? (
        <>
          <ul>
            <li onClick={() => setDisplay(!display)}>
              <Link>{state?.user?.name}</Link>
              <p style={{ textAlign: "center", cursor: "pointer" }}>
                <i className="arrow down"></i>
              </p>
              <ul className={display ? " block" : "dropdown"}>
                <li>
                  <Link
                    to="/user/dashboard"
                    className={`${
                      current === "/user/dashboard" && "active"
                    } nav-link text-light`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/profile/update"
                    className={`${
                      current === "/user/profile/update" && "active"
                    } nav-link text-light`}
                  >
                    Profile
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="nav-link text-light login logout"
                >
                  Logout
                </li>
              </ul>
            </li>
          </ul>
          {/* <Link
            to="/user/dashboard"
            className={`${
              current === "/user/dashboard" && "active"
            } nav-link text-light`}
          >
            {state?.user?.name}
          </Link>
          <Link
            to="/user/profile/update"
            className={`${
              current === "/user/profile/update" && "active"
            } nav-link text-light`}
          >
            Profile
          </Link>
          <li onClick={logout} className="nav-link text-light login">
            Logout
          </li> */}
        </>
      ) : (
        <>
          <Link
            to="/login"
            className={`${
              current === "/login" && "active"
            } nav-link text-light`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`${
              current === "/register" && "active"
            } nav-link text-light`}
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
