import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

const navigate = useNavigate();

const handleLogin = () => {
    navigate("/");
};

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async (e)=>{
try{
e.preventDefault();

const res = await axios.post(
"https://collegemarketplace.onrender.com/api/auth/login",
{
email,
password
}
);
toast.success("Login Successful");

localStorage.setItem("token",res.data.token);


navigate("/");
}
catch (err) {
    toast.error("Invalid Credentials");
}
};

return (
<div className="login">

<h1>Login</h1>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin} type="submit"
 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">Login</button>

<p>New user?<Link to="/register">Register here</Link></p>

</form>

</div>
);
}

export default Login;


