import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Online Auction
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/auctions">Auctions</Link>

        <Link to="/create-auction">Sell Item</Link>

        <Link to="/profile">Profile</Link>

        {user ? (
          <button
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;