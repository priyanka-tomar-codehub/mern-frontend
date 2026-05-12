import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

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
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Join the marketplace to add products and start selling.</p>
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
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
);
}

export default Register;