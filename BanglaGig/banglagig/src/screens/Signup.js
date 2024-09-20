import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signuppic from "../images/signuppic.jpg";

export default function Signup() {
  const [credentials, setCredentials] = useState({ firstname: "", lastname: "", email: "", password: "", usertype: "" });
  const [message, setMessage] = useState(""); // State to store success/error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        password: credentials.password,
        usertype: credentials.usertype
      })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Redirect after 1 second
    } else {
      setMessage("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>
        <img
          src={signuppic}
          style={{ height: "110%", width: "100%", objectFit: "cover", filter: "brightness(50%)", position: "absolute", zIndex: "-1" }}
          alt='Background'
        />
      </div>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card" style={{ width: "90%", marginTop: "20px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                  <div className="card-body p-4">
                    <h2 className="text-dark text-center mb-4">Create an account</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-outline">
                            <label className="form-label text-white " htmlFor="form3Example1cg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>First Name</label>
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" name='firstname' value={credentials.firstname} onChange={onChange} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-outline">
                            <label className="form-label text-white" htmlFor="form3Example2cg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Last Name</label>
                            <input type="text" id="form3Example2cg" className="form-control form-control-lg" name='lastname' value={credentials.lastname} onChange={onChange} />
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="form3Example3cg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Your Email</label>
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" name='email' value={credentials.email} onChange={onChange} />
                      </div>
                      <div className="form-outline mb-3">
                        <label className="form-label text-white px-3" htmlFor="form3Example3cg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Select User Type</label>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="usertype" id="seller" value="Seller" checked={credentials.usertype === 'Seller'} onChange={onChange} />
                          <label className="form-check-label text-white" htmlFor="seller" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Seller</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="usertype" id="buyer" value="Buyer" checked={credentials.usertype === 'Buyer'} onChange={onChange} />
                          <label className="form-check-label text-white" htmlFor="buyer" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Buyer</label>
                        </div>
                      </div>
                      <div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="form3Example4cg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Password</label>
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" name='password' value={credentials.password} onChange={onChange} />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label text-white" htmlFor="form3Example4cdg" style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Repeat your password</label>
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-lg">Register</button>
                      </div>
                      {message && <p className="text-center text-white mt-3">{message}</p>}
                      <p className="text-center text-white text-muted mt-4 " style={{  backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Already have an account? <Link to="/login" className="fw-bold text-warning"><u>Login here</u></Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
