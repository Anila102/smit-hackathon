import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate  = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);

        if(json.success){
            localStorage.setItem('token', json.authToken); 
     

            props.showAlert("success", "Logged In Successfully!")
            navigate.push("/");
        }
        else{
            props.showAlert("danger", "Please Enter Correct Credentials ")
            
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (

      
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className='d-flex w-50 justify-content-between'>
        I am a/an:  
    <label>
        <input type="radio" value="buyer" checked={selectedOption === 'buyer'}  />
      Buyer
      </label>
      <label>
        <input type="radio" value="seller" checked={selectedOption === 'seller'}  />
        Seller
      </label>
      <label>
        <input type="radio" value="admin" checked={selectedOption === 'admin'}  />
        Admin
      </label>
      </div>


                <button type="submit" className="btn btn-success">Login</button>
            </form>
     
    
    );
};

export default Login;