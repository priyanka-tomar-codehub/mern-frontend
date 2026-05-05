// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Login() {

// const navigate = useNavigate();

// const handleLogin = () => {
//     navigate("/");
// };

// const [email,setEmail] = useState("");
// const [password,setPassword] = useState("");

// const handleSubmit = async (e)=>{
// e.preventDefault();

// const res = await axios.post(
// "https://collegemarketplace.onrender.com/api/auth/login",
// {
// email,
// password
// }
// );

// localStorage.setItem("token",res.data.token);


// navigate("/");
// };

// return (
// <div className="login">

// <h1>Login</h1>

// <form onSubmit={handleSubmit}>

// <input
// type="email"
// placeholder="Email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// />

// <br/><br/>

// <input
// type="password"
// placeholder="Password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// />

// <br/><br/>

// <button onClick={handleLogin} type="submit">Login</button>

// <p>New user?<Link to="/register">Register here</Link></p>

// </form>

// </div>
// );
// }

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;