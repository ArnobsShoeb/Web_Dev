import React from 'react';
import signuppic from "../images/signuppic.jpg";

export default function Signup() {
  return (
    <div>
      <div>
        <img
          src={signuppic}
          style={{  height: "110%", width: "100%", objectFit: "cover", filter: "brightness(50%)", position: "absolute", zIndex: "-1" }}
          alt='Background'
        />
      </div>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ width:"80%", marginTop:"20px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                  <div className="card-body p-5">
                    <h2 className="text-light text-center mb-5">Create an account</h2>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <label className="form-label text-light" htmlFor="form3Example1cg" >First Name</label>
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" style={{opacity:0.5}} />
                            
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <label className="form-label text-light" htmlFor="form3Example2cg">Last Name</label>
                            <input type="text" id="form3Example2cg" className="form-control form-control-lg" style={{opacity:0.5}}/>
                            
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light" htmlFor="form3Example3cg">Your Email</label>
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" style={{opacity:0.5}} />
                        
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light px-3" htmlFor="form3Example3cg">Select User Type   </label>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input " type="radio" name="userType" id="seller" value="seller"  />
                          <label className="form-check-label text-dark" htmlFor="seller">Seller</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input " type="radio" name="userType" id="buyer" value="buyer" />
                          <label className="form-check-label text-dark" htmlFor="buyer">Buyer</label>
                        </div>
                        
                        
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light" htmlFor="form3Example4cg">Password</label>
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" style={{opacity:0.5}}  />
                        
                      </div>
                      <div className="form-outline mb-4 ">
                      <label className="form-label text-light" htmlFor="form3Example4cdg">Repeat your password</label>
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" style={{opacity:0.5}} />
                        
                      </div>
                      
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0 ">Already have an account? <a href="#!"
                        className="fw-bold text-body"><u className='text-warning'>Login here</u></a></p>
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
