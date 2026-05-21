import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e)=>{
e.preventDefault();
try{
const res = await axios.post(
"https://collegemarketplace.onrender.com/api/auth/register",
{
name,
email,
password
}
);

localStorage.setItem("token",res.data.token);


navigate("/");
}catch(error)
{
  console.log(error);
}
};

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 px-4 py-12 text-slate-900">
    <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-white/95 shadow-2xl ring-1 ring-slate-900/10 backdrop-blur-xl lg:flex-row lg:items-stretch">
      <div className="hidden flex-1 flex-col justify-center gap-6 bg-sky-900 px-10 py-14 text-white lg:flex">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            Join the Market
          </span>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
              alt="Amity University campus"
              className="h-56 w-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Start selling with confidence</h1>
          <p className="max-w-sm text-sm leading-7 text-slate-200">
            Create an account to add products, manage your inventory, and reach more buyers.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-200">
          <div className="rounded-3xl bg-white/5 p-4">✓ Easy product listing</div>
          <div className="rounded-3xl bg-white/5 p-4">✓ Secure account access</div>
          <div className="rounded-3xl bg-white/5 p-4">✓ Fast checkout setup</div>
        </div>
      </div>

      <div className="flex-1 px-8 py-10 sm:px-12 sm:py-16">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Register</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Create your seller account</h2>
          <p className="mt-3 text-sm text-slate-500">Sign up and start listing your products in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:scale-[1.01] hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Register;