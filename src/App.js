import React from "react";
import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom"; 

// import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
    {token && <Navbar/>}
      
      <Routes>
         
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/" element={token ? <Home/> :<Navigate to="/login"/>}/>
         <Route path="/add" element={token?<AddProduct/> :<Navigate to="/login"/>}/>
         <Route path="/product/:id" element={token ?<ProductDetails />:<Navigate to="/login"/>} />
         <Route path="/my-products" element={token ?<MyProducts />:<Navigate to="/login"/>} />
         <Route  path="/edit/:id" element={<EditProduct/>} />
         
      </Routes>
      
    </Router>
  );
}

export default App;
