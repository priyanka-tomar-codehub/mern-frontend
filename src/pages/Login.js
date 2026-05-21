import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://collegemarketplace.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );
      toast.success("Login Successful");

      localStorage.setItem("token", res.data.token);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 px-4 py-12 text-slate-900">
    <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-white/95 shadow-2xl ring-1 ring-slate-900/10 backdrop-blur-xl lg:flex-row lg:items-stretch">
      <div className="hidden flex-1 flex-col justify-center gap-6 bg-indigo-950 px-10 py-14 text-white lg:flex">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            Welcome Back
          </span>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
              alt="Amity University campus"
              className="h-56 w-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Secure access for your marketplace</h1>
          <p className="max-w-sm text-sm leading-7 text-slate-200">
            Log in to manage products, track sales, and publish listings with confidence.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-200">
          <div className="rounded-3xl bg-white/5 p-4">✓ Fast and secure login</div>
          <div className="rounded-3xl bg-white/5 p-4">✓ Manage your products easily</div>
          <div className="rounded-3xl bg-white/5 p-4">✓ Trusted marketplace experience</div>
        </div>
      </div>

      <div className="flex-1 px-8 py-10 sm:px-12 sm:py-16">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Seller Login</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Welcome back, let's get you signed in</h2>
          <p className="mt-3 text-sm text-slate-500">Enter your email and password to access your seller dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:scale-[1.01] hover:shadow-xl ${loading ? 'bg-slate-400 cursor-not-allowed hover:scale-100' : 'bg-gradient-to-r from-indigo-600 to-sky-600 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-sky-700'}`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New user?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;


