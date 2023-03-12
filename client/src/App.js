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

                <Route exact path="/login" element={<Login showAlert={showAlert} />}   />
                    <Route exact path="/signup" element={<Signup showAlert={showAlert} />}   />
                    
                </Routes>


            </div>
        </Router>
    );
}

export default App;