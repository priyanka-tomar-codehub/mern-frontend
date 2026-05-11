import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

          <div className="hidden rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 md:flex md:items-center">
            <span className="mr-2 font-medium text-slate-900">Shop</span>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm">Market</span>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="w-full max-w-xl">
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                🔍
              </span>
              <input
                id="site-search"
                type="search"
                placeholder="Search products, categories..."
                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
          >
            Cart
            <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-indigo-600 px-2 text-xs font-semibold text-white">
              3
            </span>
          </button>

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
            to="/add"
            onClick={() => setMenuOpen(false)}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Add Product
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


