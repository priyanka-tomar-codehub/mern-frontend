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
<div className="register">

<h2>Register</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

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

<button type="submit">Register</button>

<p>Already have Account? <Link to="/login">Login</Link></p>

</form>

</div>
);
}

export default Register;