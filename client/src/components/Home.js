import React from 'react'
import logo from "../asset/logo/Logo.png"
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center' >


                <div ><h2 > SAYLANI WELFARE ONLINE MARKET PLACE </h2> </div>
                
                
            </div>
            <div className='container d-flex justify-content-center align-items-center' >

                <img className='w-25 h-25' src={logo} alt="loading" /></div>
            <div className='container d-flex justify-content-center align-items-center '>

                <button type="submit" onClick={() => { navigate("/signup") }} className="btn btn-success my-4 mx-3 d-block">Get Started </button>
                <button type="submit" onClick={() => { navigate("/login") }} className="btn btn-success my-4  d-block">Already have an account?</button>
            </div>
        </>
    )
}
