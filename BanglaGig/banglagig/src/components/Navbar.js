import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [userType, setUserType] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const cachedFirstname = localStorage.getItem('firstname') || '';
    const cachedUsertype = localStorage.getItem('usertype') || '';
    const email = (localStorage.getItem('email') || '').trim();

    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);

    // If we have an email, fetch decrypted user data from the backend
    if (email) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:4000/api/fetchuserdata?email=${encodeURIComponent(email)}`);
          if (res.ok) {
            const user = await res.json(); // expects { firstname, lastname, email, usertype, ... } decrypted
            const first = user?.firstname || '';
            const type  = user?.usertype || '';

            setUsername(first);
            setUserType(type);

            // keep localStorage in sync for other pages
            if (first) localStorage.setItem('firstname', first);
            if (type)  localStorage.setItem('usertype', type);
            if (user?.email) localStorage.setItem('email', user.email);
          } else {
            // fallback to whatever we have cached
            setUsername(cachedFirstname);
            setUserType(cachedUsertype);
          }
        } catch (e) {
          console.error('Failed to fetch user data:', e);
          setUsername(cachedFirstname);
          setUserType(cachedUsertype);
        }
      })();
    } else {
      // No email in storage — fallback to cached name/usertype if present
      setUsername(cachedFirstname);
      setUserType(cachedUsertype);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('firstname');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUsername('');
    setUserType('');
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

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/proposals">
                  Proposals
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
                  {username || 'Profile'}
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
