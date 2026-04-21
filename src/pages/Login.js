import React, { useState } from "react";
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
e.preventDefault();

const res = await axios.post(
"https://collegemarketplace.onrender.com/api/auth/login",
{
email,
password
}
);

localStorage.setItem("token",res.data.token);


navigate("/");
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

<button onClick={handleLogin} type="submit">Login</button>

<p>New user?<Link to="/register">Register here</Link></p>

</form>

</div>
);
}

export default Login;