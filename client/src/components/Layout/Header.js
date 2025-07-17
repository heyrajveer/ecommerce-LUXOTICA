import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { SearchInput } from "../Form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <RiShoppingBag4Fill /> Luxotica
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
              <SearchInput/>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                      }`} 
                       className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart (0)
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
