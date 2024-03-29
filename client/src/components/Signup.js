import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:"", role:""})
  let navigate = useNavigate();

  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const {name, email, password,role}=credentials;
     const response = await fetch("http://localhost:5000/api/auth/createuser", {

         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({name, email, password , role})
     });
     const json = await response.json()
     console.log(json);

     if(json.success){
           localStorage.setItem('token', json.authToken); 
           navigate("/login");
           props.showAlert("success", "Acoount Created Successfully!")

    }
     else{
       props.showAlert("danger", "Invalid credentials ")

     }
     setCredentials({name, email, password})
  }
    
      const onChange=(e)=>{
         setCredentials({ ...credentials, [e.target.name]: e.target.value })
      } 
  return <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">


        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
      </div>
      <div className='d-flex w-50 justify-content-between' onChange={onChange}>
        Create Account as: 
    <label>
        <input type="radio" value="user" name="role"  />
      Buyer
      </label>
      <label>
        <input type="radio" value="seller" name="role"  />
        Seller
      </label>
      <label>
        <input type="radio" value="admin"  name="role"   />
        Admin
      </label>
      </div>
      <button type="submit" className="btn btn-success my-4 d-block">Sign up</button>

    </form>
  </div>;

};

export default Signup;