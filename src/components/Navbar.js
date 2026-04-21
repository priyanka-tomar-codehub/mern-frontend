import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";

function Navbar(){
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
  
    return(
        <div className="navbar">
            <h2 className="logo">CampusMart</h2>
                
                

        <div className="nav-links">

        <Link to="/" >Home</Link>
        
        {/* <Link to="/login" style={{marginRight:"15px"}}>Login</Link>
        
        <Link to="/register" style={{marginRight:"15px"}}>Register</Link> */}

        <Link to="/my-products" >My Products</Link>
        
        <Link to="/add">Add Product</Link>

        <button onClick={logout} className="logout-btn">Logout</button>
        </div>
        
        </div>
    );

}

export default Navbar;
