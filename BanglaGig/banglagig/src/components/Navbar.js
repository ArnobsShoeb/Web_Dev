import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [userType, setUserType] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('firstname');
    const storedUserType = localStorage.getItem('usertype');

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('firstname');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 fw-bold text-uppercase" to="/">
          BanglaGig
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {isLoggedIn && userType === 'Seller' && (
              <li className="nav-item">
                <Link className="nav-link" to="/mygigs">
                  My Gigs
                </Link>
              </li>
            )}
            {isLoggedIn && userType === 'Buyer' && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-orders">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Link className="nav-link text-white me-3" to="/userdetails">
                  {username}
                </Link>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
