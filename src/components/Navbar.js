import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <h2 className="text-2xl font-bold text-blue-600 cursor-pointer">
        CampusMart
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-500 font-medium">Home</Link>
        <Link to="/my-products" className="hover:text-blue-500 font-medium">My Products</Link>
        <Link to="/add" className="hover:text-blue-500 font-medium">Add Product</Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;