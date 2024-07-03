import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("firstname");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("firstname");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            BanglaGig
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active  mt-3 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" to="/">
                  Features
                </Link>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" to="/">
                  Pricing
                </Link>
              </li>
              </ul>
              <div className="btn text-white text-decoration-none mt-2 fs-3" >
              {isLoggedIn ? 
                ( <Link className="text-decoration-none text-white" to="/userdetails">{username}</Link> ) : 
                (<p >Login in Here </p>)
            }

              
            </div>
            
            <div className="d-flex">
            {isLoggedIn ? 
              ( <button className="btn bg-white text-Dark mx-1" onClick={handleLogout}>Logout</button> ) : 
              (<Link className="btn bg-white text-Dark mx-1" to="/login">Login</Link>)
            }
            </div>
            
          </div>
        </div>
      </nav>
    </div>
  );
}
