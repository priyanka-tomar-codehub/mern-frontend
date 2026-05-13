import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import axios from "axios";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://collegemarketplace.onrender.com/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    // Load initial search term from localStorage
    const globalSearch = localStorage.getItem("globalSearch") || "";
    setSearchTerm(globalSearch);
  }, []);

  // Fuse.js configuration
  const fuse = new Fuse(products, {
    keys: ["title", "category"],
    threshold: 0.4,
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const results = fuse.search(value).map(result => result.item).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
      setShowDropdown(true);
      // Store search term in localStorage to affect Home page
      localStorage.setItem("globalSearch", value);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      localStorage.removeItem("globalSearch");
    }
  };

  // Handle search result click
  const handleResultClick = (product) => {
    setSearchTerm("");
    setShowDropdown(false);
    localStorage.removeItem("globalSearch");
    localStorage.setItem("lastViewed", JSON.stringify(product));
    navigate(`/product/${product._id}`);
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    return `https://collegemarketplace.onrender.com/uploads/${encodeURIComponent(image)}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg">
              C
            </span>
            <span>CampusMart</span>
          </Link>

          <div className="hidden items-center gap-4 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 md:flex md:items-center">
            <Link
              to="/"
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              to="/my-products"
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
            >
              My Products
            </Link>
            <Link
              to="/add"
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
            >
              Add Product
            </Link>
          </div>

          <div className="hidden rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 md:flex md:items-center">
            <span className="mr-2 font-medium text-slate-900">Shop</span>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm">Market</span>
          </div>
        </div>

         <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="w-full max-w-xl relative" ref={searchRef}>
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                🔍
              </span>
              <input
                id="site-search"
                type="search"
                placeholder="Search products, categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm && setShowDropdown(true)}
                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setShowDropdown(false);
                    localStorage.removeItem("globalSearch");
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleResultClick(product)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                  >
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Ctext x='50' y='55' fill='%23717c8a' font-family='Arial,sans-serif' font-size='12' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        ₹{product.price} • {product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
       

        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/myorders">
            <button
              type="button"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
            >
              My Orders
            </button>
          </Link>

          <button
            onClick={logout}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-sky-600"
          >
            Logout
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      <nav className={`${menuOpen ? "block" : "hidden"} border-t border-slate-200 bg-white md:hidden`}>
        <div className="space-y-1 px-4 py-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/my-products"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            My Products
          </Link>
          <Link
            to="/myorders"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            My Orders
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;


