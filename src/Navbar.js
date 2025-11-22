import { NavLink } from "react-router-dom";
import Brand from "./srec_logo.jpg";
import "./navbar.css";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div>
            <img className="logo" src={Brand}></img>
          </div>
          <span className="title">
            {" "}
            Sri Ramakrishna Engineering College Hostel
          </span>
          <div className="nav-elements">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/staff">Tutor</Link>
              </li>
              <li>
                <Link to="/warden">Warden</Link>
              </li>
              <li>
                <Link to="/student">Student</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
