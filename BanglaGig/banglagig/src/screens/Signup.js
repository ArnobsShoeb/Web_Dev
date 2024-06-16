import React,{useState} from 'react';
import signuppic from "../images/signuppic.jpg";
import { Link } from 'react-router-dom';
export default function Signup() {

    const [credentials,setCredentials]=useState({firstname:"",lastname:"",email:"",password:"",usertype:""})

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response =await fetch("http://localhost:4000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify({firstname:credentials.firstname,lastname:credentials.lastname,email:credentials.email,password:credentials.password,usertype:credentials.usertype})
    });
    const json=await response.json()
    console.log(json)

    if(!json.success){
        alert("Enter Valid Credentials")
    }
    }
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]: event.target.value })
    }
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
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <label className="form-label text-light" htmlFor="form3Example1cg" >First Name</label>
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" style={{opacity:0.5}} name='firstname' value={credentials.firstname} onChange={onChange} />
                            
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <label className="form-label text-light" htmlFor="form3Example2cg">Last Name</label>
                            <input type="text" id="form3Example2cg" className="form-control form-control-lg" style={{opacity:0.5}} name='lastname' value={credentials.lastname} onChange={onChange} />
                            
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light" htmlFor="form3Example3cg">Your Email</label>
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" style={{opacity:0.5}} name='email' value={credentials.email} onChange={onChange} />
                        
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light px-3" htmlFor="form3Example3cg">Select User Type   </label>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input " type="radio" name="usertype" id="seller"  value="Seller" checked={credentials.usertype === 'Seller'} onChange={onChange} />
                          <label className="form-check-label text-dark" htmlFor="seller">Seller</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input " type="radio" name="usertype" id="buyer"  value="Buyer" checked={credentials.usertype === 'Buyer'} onChange={onChange} />
                          <label className="form-check-label text-dark" htmlFor="buyer">Buyer</label>
                        </div>
                        
                        
                      </div>
                      <div className="form-outline mb-4">
                      <label className="form-label text-light" htmlFor="form3Example4cg">Password</label>
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" style={{opacity:0.5}} name='password' value={credentials.password} onChange={onChange} />
                        
                      </div>
                      <div className="form-outline mb-4 ">
                      <label className="form-label text-light" htmlFor="form3Example4cdg">Repeat your password</label>
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" style={{opacity:0.5}} />
                        
                      </div>
                      
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0 ">Already have an account? <Link to="/login"
                        className="fw-bold text-body"><u className='text-warning'>Login here</u></Link></p>
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
