import { Link, useNavigate  } from "react-router-dom";
import classes from "../css/Navbar.module.css";
import { useDispatch } from "react-redux";

import { logout } from "../store";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="row d-flex justify-content-center container mt-2">
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.widgets}`}>
            <div
              className={`d-flex justify-content-between ${classes.navRow} m-t-0`}
            >
              <Link className={`${classes.navText} navbar-brand`} to="/movies">
                Movies
              </Link>
              <Link
                className={`${classes.navText} nav-link`}
                to="/movie/create"
              >
                Create
              </Link>
              <div className="d-flex">
                <button onClick={logOut} className="btn btn-danger">
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
