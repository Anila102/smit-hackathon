import './App.css';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import ProductState from './context/products/ProductsState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (type, message) => {
        setAlert({
            type: type,
            message: message
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }
    return (
        // <ProductState>
        <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container my-3">
                <Routes>

                <Route exact path="/" element={<Home showAlert={showAlert} />}   />
                <Route exact path="/login" element={<Login showAlert={showAlert} />}   />
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}   />
                <Route exact path="/dashboard" element={<Dashboard />}   />
                    
                </Routes>


            </div>
        </Router>
    );
}

export default App;