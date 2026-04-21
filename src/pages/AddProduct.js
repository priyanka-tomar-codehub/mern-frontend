import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

const navigate = useNavigate();

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [price,setPrice] = useState("");
const [category,setCategory] = useState("");
const [image,setImage] = useState(null);

const handleSubmit = async(e)=>{
e.preventDefault();

const token = localStorage.getItem("token");

const formData = new FormData();

formData.append("title", title);
formData.append("description", description);
formData.append("price", price);
formData.append("category", category);
formData.append("image", image);

await axios.post("https://collegemarketplace.onrender.com/api/products",
formData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

navigate("/");
};

return (
<div className="addPro">

<h1>Add Product</h1>


<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<br/><br/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
style={{marginLeft: "85px"}}
/>

<br/><br/>
<button className="btn" type="submit">Add Product</button>

</form>
</div>


);
}

export default AddProduct;